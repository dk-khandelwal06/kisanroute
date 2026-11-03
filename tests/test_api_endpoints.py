"""
Automated unit and integration tests for KisanRoute API route handlers and schemas.
Tests:
- GET /api/health
- GET /api/model/info
- POST /api/predict (Valid queries across 5 categories)
- POST /api/predict (Input validation errors)
- GET /api/analytics (Evaluation metrics & confusion matrix)
- POST /api/explain (AI explanation & deterministic fallback)
"""

import asyncio
import pytest
from fastapi import HTTPException

from backend.api.routes import (
    get_health,
    get_model_info,
    predict_query,
    get_analytics,
    explain_prediction
)
from backend.api.schemas import PredictionRequest, ExplainRequest

def test_health_endpoint():
    res = get_health()
    assert res.status == "HEALTHY"
    assert res.model_loaded is True
    assert len(res.categories) == 5
    assert "Plant Protection" in res.categories

def test_model_info_endpoint():
    res = get_model_info()
    assert res.model_name in ["Multinomial Naive Bayes", "Logistic Regression"]
    assert res.vocabulary_size > 100
    assert "categories" in res.dataset_metadata
    assert "accuracy" in res.evaluation_summary

def test_predict_endpoint_success():
    queries = [
        ("My wheat leaves have yellow rust pustules and brown lesions", "Plant Protection"),
        ("Is there heavy rain or hailstorm forecast in Punjab this week?", "Weather"),
        ("When will the next PM-KISAN installment be credited into bank?", "Government Schemes"),
        ("What is the balanced NPK dose of DAP and urea for paddy crop?", "Nutrient Management"),
        ("What is today modal mandi price of mustard in Bharatpur market?", "Market Information")
    ]
    for q, expected_cat in queries:
        req = PredictionRequest(query=q)
        res = predict_query(req)
        assert res.predicted_category == expected_cat
        assert res.confidence > 0.0
        assert res.specialist.role is not None
        assert res.specialist.department is not None
        assert res.specialist.turnaround_sla is not None
        assert len(res.class_probabilities) == 5

def test_predict_endpoint_validation():
    # Query too short
    with pytest.raises(Exception):
        PredictionRequest(query="hi")

    # Repetitive character garbage
    with pytest.raises(Exception):
        PredictionRequest(query="aaaaaaaaaaaa")

def test_analytics_endpoint():
    res = get_analytics()
    assert "models_comparison" in res
    assert "best_model" in res
    assert "Majority-Class Baseline" in res["models_comparison"]
    assert "Multinomial Naive Bayes" in res["models_comparison"]
    assert "Logistic Regression" in res["models_comparison"]
    
    nb = res["models_comparison"]["Multinomial Naive Bayes"]
    assert "confusion_matrix" in nb
    assert "classification_report" in nb
    assert nb["accuracy"] > 0.80

def test_explain_endpoint():
    req = ExplainRequest(
        query="Yellow rust symptoms appearing in wheat crop field",
        predicted_category="Plant Protection",
        confidence=0.88,
        specialist_role="Crop Protection & Pathology Specialist"
    )
    res = explain_prediction(req)
    assert res.source in ["gemini_2.5_flash", "domain_rules", "domain_rules_fallback"]
    assert len(res.explanation) > 20
    assert bool(res.disclaimer)
