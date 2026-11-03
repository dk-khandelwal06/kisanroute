"""
FastAPI route handlers for KisanRoute.
Provides endpoints for health check, model introspection, inference, analytics, and explanation.
Uses synchronous def handlers for CPU-bound ML and analytics (FastAPI threadpool),
and async def for I/O bound Gemini explanation.
"""

from datetime import datetime, timezone
import json
import os
from fastapi import APIRouter, HTTPException, status

from backend.api.schemas import (
    PredictionRequest,
    PredictionResponse,
    ExplainRequest,
    ExplainResponse,
    HealthResponse,
    ModelInfoResponse
)
from backend.core.config import settings
from backend.core.nlp_engine import nlp_engine
from backend.core.gemini_client import generate_explanation

router = APIRouter(prefix=settings.API_PREFIX, tags=["KisanRoute API"])

@router.get("/health", response_model=HealthResponse)
def get_health():
    """Health check endpoint: verifies service status and model availability."""
    return HealthResponse(
        status="HEALTHY" if nlp_engine.is_loaded else "DEGRADED",
        model_loaded=nlp_engine.is_loaded,
        model_name=nlp_engine.metadata.get("model_name", "Multinomial Naive Bayes") if nlp_engine.metadata else "Multinomial Naive Bayes",
        categories=nlp_engine.categories,
        version=settings.VERSION,
        timestamp=datetime.now(timezone.utc).isoformat()
    )

@router.get("/model/info", response_model=ModelInfoResponse)
def get_model_info():
    """Detailed model information including architecture, categories, and test performance."""
    if not nlp_engine.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Model pipeline not loaded: {nlp_engine.load_error or 'Unknown error'}"
        )
    
    metadata = nlp_engine.metadata or {}
    metrics = nlp_engine.metrics or {}
    
    return ModelInfoResponse(
        model_name=metadata.get("model_name", "Multinomial Naive Bayes"),
        version=metadata.get("version", "1.0.0"),
        pipeline_components=metadata.get("pipeline_components", ["TfidfVectorizer", "MultinomialNB"]),
        categories=nlp_engine.categories,
        vocabulary_size=metadata.get("vocabulary_size", 0),
        dataset_metadata=metrics.get("dataset_metadata", {}),
        evaluation_summary=metrics.get("evaluation_summary", {})
    )

@router.post("/predict", response_model=PredictionResponse)
def predict_query(request: PredictionRequest):
    """
    Classify a farmer's agricultural query and generate specialist routing recommendation.
    Uses trained TF-IDF + Classifier pipeline with confidence calibration.
    """
    if not nlp_engine.is_loaded:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Classification model is currently unavailable. Please check backend health."
        )
        
    try:
        result = nlp_engine.predict(request.query)
        return PredictionResponse(**result)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Inference execution error.")

@router.get("/analytics")
def get_analytics():
    """
    Return genuine model evaluation metrics, comparison across models,
    confusion matrix, and class distribution.
    """
    if os.path.exists(settings.METRICS_PATH):
        try:
            with open(settings.METRICS_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error reading metrics artifact: {e}"
            )
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Evaluation metrics artifact not found. Please train models first."
    )

@router.post("/explain", response_model=ExplainResponse)
def explain_prediction(request: ExplainRequest):
    """
    Generate an AI-assisted explanation for the classification and specialist routing.
    Powered by Gemini server-side when configured, with robust domain rules fallback.
    """
    res = generate_explanation(
        query=request.query,
        predicted_category=request.predicted_category,
        confidence=request.confidence,
        specialist_role=request.specialist_role
    )
    return ExplainResponse(**res)
