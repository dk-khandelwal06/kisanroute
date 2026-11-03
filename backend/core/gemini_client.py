"""
Server-side Gemini Client for KisanRoute
Provides AI-assisted rationale for classification and routing decisions.
Strictly decoupled from core classification: the ML model remains the authority on categories.
Uses synchronous requests for threadpool safety and robust fallback.
"""

import logging
import os
from typing import Dict, Any
import requests

from backend.core.config import settings

logger = logging.getLogger("kisanroute.gemini")

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

DOMAIN_FALLBACK_EXPLANATIONS = {
    "Plant Protection": (
        "This query focuses on crop symptoms, disease indicators, or insect pest damage. "
        "The TF-IDF vectorizer detected high feature weights corresponding to pathological or entomological markers. "
        "The query is routed to the Crop Protection & Pathology Specialist for rapid symptom diagnosis, "
        "pest threshold assessment, and targeted IPM intervention guidelines."
    ),
    "Weather": (
        "This query inquires about atmospheric conditions, precipitation, frost, or temperature extremes. "
        "The NLP model identified meteorological intent affecting farm operations. "
        "The query is routed to the Agricultural Meteorology Specialist to cross-reference multi-day block forecasts "
        "and issue tactical advisories regarding irrigation, harvesting, or spray timing."
    ),
    "Government Schemes": (
        "This query pertains to institutional subsidies, insurance loss filing, or public agricultural credit. "
        "Key terms map to statutory entitlements and welfare portals (e.g. PM-KISAN, PMFBY, KCC). "
        "The query is routed to the Rural Scheme & Credit Liaison Officer to provide eligibility clarification, "
        "portal redressal assistance, and application protocols."
    ),
    "Nutrient Management": (
        "This query concerns soil fertility, fertilizer split applications, or plant nutritional deficiencies. "
        "The model recognized diagnostic terms relating to macronutrient (NPK) or micronutrient hunger and soil amendments. "
        "The query is routed to the Agronomist & Soil Health Specialist to formulate balanced dosage schedules "
        "aligned with Soil Health Card recommendations."
    ),
    "Market Information": (
        "This query relates to commodity pricing, APMC mandi arrivals, Minimum Support Price (MSP), or storage options. "
        "The classification pipeline identified commercial post-harvest intent. "
        "The query is routed to the Agricultural Marketing & Mandi Analyst to provide verified modal prices, "
        "procurement schedules, and e-NAM transaction guidance."
    )
}

def generate_explanation(
    query: str,
    predicted_category: str,
    confidence: float,
    specialist_role: str
) -> Dict[str, Any]:
    """
    Generate an explanation of the routing rationale.
    Uses Gemini API server-side when reachable, with deterministic fallback.
    """
    if os.getenv("TESTING") == "1" or not settings.GEMINI_API_KEY:
        return {
            "source": "domain_rules",
            "explanation": DOMAIN_FALLBACK_EXPLANATIONS.get(
                predicted_category,
                f"The inquiry was categorized under {predicted_category} and routed to {specialist_role} based on vocabulary feature weighting."
            ),
            "disclaimer": "Explanation provided via KisanRoute domain rules (Gemini API key not configured or testing mode enabled)."
        }

    prompt = (
        f"You are an agricultural AI routing explainer for KisanRoute.\n"
        f"Farmer Query: \"{query}\"\n"
        f"Predicted Category: {predicted_category} (Confidence: {confidence * 100:.1f}%)\n"
        f"Assigned Specialist: {specialist_role}\n\n"
        f"Instructions:\n"
        f"1. Explain in 2-3 concise sentences why this question was classified into this category.\n"
        f"2. Explain what aspect of the inquiry the assigned specialist will address.\n"
        f"3. DO NOT prescribe chemical dosages, pesticide recommendations, or agricultural treatments yourself.\n"
        f"4. Keep the explanation professional, educational, and respectful of the farmer's context."
    )

    url = f"{GEMINI_API_URL}?key={settings.GEMINI_API_KEY}"
    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 200
        }
    }

    try:
        response = requests.post(url, json=payload, timeout=(1.5, 3.0))
        if response.status_code == 200:
            data = response.json()
            text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            return {
                "source": "gemini_2.5_flash",
                "explanation": text,
                "disclaimer": "AI-generated explanation of routing rationale. Official advisory is provided by the assigned specialist."
            }
        else:
            logger.warning(f"Gemini API returned status {response.status_code}: {response.text[:120]}")
    except Exception as e:
        logger.warning(f"Gemini API request skipped/failed ({type(e).__name__}): {e}")

    # Deterministic fallback
    return {
        "source": "domain_rules_fallback",
        "explanation": DOMAIN_FALLBACK_EXPLANATIONS.get(
            predicted_category,
            f"The inquiry was categorized under {predicted_category} and routed to {specialist_role} based on vocabulary feature weighting."
        ),
        "disclaimer": "Domain explanation provided via KisanRoute rules engine (Gemini external service currently unreachable)."
    }
