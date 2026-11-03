"""
KisanRoute Core NLP Inference Engine
Loads the serialized Scikit-learn Pipeline (TF-IDF + Classifier),
runs text preprocessing, inference, probability calibration,
and routes to the appropriate agricultural specialist.
"""

import json
import logging
import os
import re
import time
from typing import Dict, Any, Optional
import joblib
import numpy as np

from backend.core.config import settings
from backend.core.routing import get_specialist_routing

logger = logging.getLogger("kisanroute.nlp")

def preprocess_query(text: str) -> str:
    """Standardize query string matching the training pipeline preprocessing."""
    if not isinstance(text, str):
        return ""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s\-]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

class NLPEngine:
    def __init__(self):
        self.pipeline = None
        self.metadata = None
        self.metrics = None
        self.is_loaded = False
        self.load_error = None
        self.categories = [
            "Government Schemes",
            "Market Information",
            "Nutrient Management",
            "Plant Protection",
            "Weather"
        ]
        self._load_artifacts()

    def _load_artifacts(self):
        """Load trained model pipeline and metadata."""
        try:
            if not os.path.exists(settings.MODEL_PATH):
                raise FileNotFoundError(f"Model artifact not found at {settings.MODEL_PATH}")
            
            self.pipeline = joblib.load(settings.MODEL_PATH)
            
            # Load metadata if exists
            if os.path.exists(settings.METADATA_PATH):
                with open(settings.METADATA_PATH, "r", encoding="utf-8") as f:
                    self.metadata = json.load(f)
                    if "categories" in self.metadata:
                        self.categories = self.metadata["categories"]
                        
            # Load metrics if exists
            if os.path.exists(settings.METRICS_PATH):
                with open(settings.METRICS_PATH, "r", encoding="utf-8") as f:
                    self.metrics = json.load(f)
                    
            self.is_loaded = True
            logger.info("Successfully loaded NLP pipeline and artifacts.")
        except Exception as e:
            self.is_loaded = False
            self.load_error = str(e)
            logger.error(f"Failed to load NLP artifacts: {e}")

    def predict(self, raw_query: str) -> Dict[str, Any]:
        """
        Run inference on raw query.
        Returns prediction, confidence, probability distribution, and specialist routing.
        """
        if not self.is_loaded or self.pipeline is None:
            raise RuntimeError(f"NLP model is not available: {self.load_error or 'Artifacts not loaded'}")

        clean_text = preprocess_query(raw_query)
        if not clean_text:
            raise ValueError("Query contains no valid alphanumeric content after preprocessing.")

        start_time = time.perf_counter()
        
        # Predict class
        predicted_category = self.pipeline.predict([clean_text])[0]
        
        # Calculate class probabilities
        probabilities = {}
        confidence = 0.0
        
        if hasattr(self.pipeline, "predict_proba"):
            probs = self.pipeline.predict_proba([clean_text])[0]
            classes = self.pipeline.classes_
            for cls_name, prob in zip(classes, probs):
                probabilities[cls_name] = round(float(prob), 4)
            confidence = round(float(np.max(probs)), 4)
        else:
            confidence = 1.0
            probabilities = {predicted_category: 1.0}

        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        
        # Check out-of-distribution / low-confidence threshold
        is_low_confidence = bool(confidence < settings.CONFIDENCE_THRESHOLD)
        
        # Fetch specialist routing
        specialist = get_specialist_routing(predicted_category, is_low_confidence=is_low_confidence)
        
        return {
            "query": raw_query,
            "cleaned_query": clean_text,
            "predicted_category": predicted_category,
            "confidence": confidence,
            "is_low_confidence": is_low_confidence,
            "confidence_level": "High" if confidence >= 0.70 else ("Moderate" if confidence >= 0.50 else "Low"),
            "class_probabilities": probabilities,
            "specialist": specialist,
            "model_info": {
                "name": self.metadata.get("model_name", "Multinomial Naive Bayes") if self.metadata else "Multinomial Naive Bayes",
                "version": self.metadata.get("version", "1.0.0") if self.metadata else "1.0.0",
                "vocabulary_size": self.metadata.get("vocabulary_size", 0) if self.metadata else 0,
                "latency_ms": latency_ms
            },
            "processing_status": "LOW_CONFIDENCE_FLAGGED" if is_low_confidence else "SUCCESS"
        }

# Global singleton
nlp_engine = NLPEngine()

