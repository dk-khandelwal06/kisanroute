"""
Automated unit tests for KisanRoute NLP Pipeline and Model Artifacts.
"""

import os
import pytest
from backend.core.nlp_engine import nlp_engine, preprocess_query
from backend.core.routing import ROUTING_DIRECTORY, DEFAULT_FALLBACK_ROUTING, get_specialist_routing

def test_nlp_engine_loaded():
    assert nlp_engine.is_loaded is True
    assert nlp_engine.pipeline is not None
    assert len(nlp_engine.categories) == 5

def test_preprocess_query():
    raw = "  My WHEAT crop has yellow spots!!!  What spray?   "
    clean = preprocess_query(raw)
    assert clean == "my wheat crop has yellow spots what spray"
    assert preprocess_query("") == ""
    assert preprocess_query(None) == ""

def test_prediction_categories():
    test_cases = [
        ("My wheat leaves have yellow rust pustules and brown lesions", "Plant Protection"),
        ("Heavy rainfall and storm expected in coastal district tonight", "Weather"),
        ("How to check PM-KISAN 2000 rupee installment status", "Government Schemes"),
        ("What is the NPK fertilizer dose of urea and DAP per acre for paddy?", "Nutrient Management"),
        ("What is today mandi bhav of mustard and wheat in market?", "Market Information")
    ]
    
    for query, expected_cat in test_cases:
        res = nlp_engine.predict(query)
        assert res["predicted_category"] == expected_cat, f"Expected {expected_cat} for query '{query}', got {res['predicted_category']}"
        assert res["confidence"] > 0.0
        assert "specialist" in res
        assert res["specialist"]["role"] is not None
        assert len(res["class_probabilities"]) == 5
        # Probabilities sum close to 1
        total_prob = sum(res["class_probabilities"].values())
        assert 0.98 <= total_prob <= 1.02

def test_routing_directory():
    for cat in nlp_engine.categories:
        routing = get_specialist_routing(cat, is_low_confidence=False)
        assert routing["role"] != DEFAULT_FALLBACK_ROUTING["role"]
        assert "department" in routing
        assert "turnaround_sla" in routing
        assert len(routing["key_responsibilities"]) > 0

def test_low_confidence_fallback_routing():
    fallback = get_specialist_routing("Unknown Category", is_low_confidence=True)
    assert fallback["role"] == "General Agricultural Extension Helpdesk"
