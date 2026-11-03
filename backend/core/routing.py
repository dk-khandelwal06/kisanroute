"""
Specialist Domain Routing Knowledge Base
Maps model predicted categories to concrete agricultural specialist roles,
operating scopes, SLA response expectations, and protocol advisories.
"""

from typing import Dict, Any

ROUTING_DIRECTORY: Dict[str, Dict[str, Any]] = {
    "Plant Protection": {
        "role": "Crop Protection & Pathology Specialist",
        "title": "Senior Extension Entomologist / Pathologist",
        "department": "Division of Plant Protection & Integrated Pest Management (IPM)",
        "badge_color": "emerald",
        "turnaround_sla": "2-4 Hours (High Urgency)",
        "description": "Specializes in fungal blights, viral complexes, insect pest outbreaks, bio-control treatments, and chemical dosage protocols.",
        "routing_rationale": "Inquiry involves crop damage symptoms, pest infestation, or disease progression requiring rapid diagnostic confirmation and targeted intervention.",
        "key_responsibilities": [
            "Identify causal organism (fungal, bacterial, viral, or insect pest)",
            "Advise on Economic Threshold Level (ETL) and IPM interventions",
            "Provide registered pesticide/fungicide chemical dosages and pre-harvest intervals",
            "Recommend bio-pesticide and cultural control alternatives"
        ],
        "contact_channel": "Direct Toll-Free Extension Line / Krishi Vigyan Kendra (KVK) Plant Clinic"
    },
    "Weather": {
        "role": "Agricultural Meteorology Specialist",
        "title": "Agromet Advisory Scientist",
        "department": "Agricultural Meteorology Field Unit (AMFU) / IMD Agromet",
        "badge_color": "sky",
        "turnaround_sla": "1-2 Hours (Immediate Advisory)",
        "description": "Specializes in localized weather forecasts, monsoon progression, frost mitigation, heatwave advisory, and rainfast spraying windows.",
        "routing_rationale": "Inquiry requires short-to-medium range weather interpretation to prevent crop loss from rainfall, frost, hailstorms, or extreme temperature.",
        "key_responsibilities": [
            "Interpret block-level multi-day agromet forecasts",
            "Provide frost mitigation guidelines (light night irrigation, smoke blankets)",
            "Advise on harvesting and drainage timelines before forecasted precipitation",
            "Guide rainfast adjuvant selection and pesticide spray scheduling"
        ],
        "contact_channel": "District Agromet Advisory Service (DAAS) Bulletin / Gramin Krishi Mausam Sewa"
    },
    "Government Schemes": {
        "role": "Rural Scheme & Credit Liaison Officer",
        "title": "District Agriculture Officer (Extension & Subsidies)",
        "department": "Department of Agriculture & Farmers Welfare (DBT & Insurance Cell)",
        "badge_color": "amber",
        "turnaround_sla": "24-48 Hours",
        "description": "Specializes in PM-KISAN verification, PMFBY crop insurance claim filing, Kisan Credit Card (KCC) interest subvention, and farm machinery subsidies.",
        "routing_rationale": "Inquiry centers on government entitlement, financial support, insurance loss surveys, or portal registration grievances.",
        "key_responsibilities": [
            "Verify PM-KISAN beneficiary status, eKYC, and land seeding records",
            "Guide PMFBY 72-hour localized loss reporting and surveyor coordination",
            "Assist with KCC loan limits, interest subvention rates, and renewal",
            "Clarify subsidy norms for solar pumps (PM-KUSUM) and farm mechanization (SMAM)"
        ],
        "contact_channel": "Block Agriculture Office (BAO) Helpdesk / PM-KISAN Grievance Portal"
    },
    "Nutrient Management": {
        "role": "Agronomist & Soil Health Specialist",
        "title": "Senior Soil Scientist & Plant Nutritionist",
        "department": "Division of Soil Science & Agricultural Chemistry",
        "badge_color": "teal",
        "turnaround_sla": "4-8 Hours",
        "description": "Specializes in Soil Health Card interpretation, balanced NPK dosing, split fertilizer application, micronutrient deficiencies, and soil reclamation.",
        "routing_rationale": "Inquiry involves fertilizer recommendations, soil fertility testing, yellowing due to nutrient hunger, or soil acidity/salinity correction.",
        "key_responsibilities": [
            "Translate Soil Health Card parameters into crop-specific fertilizer schedules",
            "Formulate split-application schedules for Urea, DAP, and Potash",
            "Diagnose micronutrient hunger (Zinc, Boron, Iron, Manganese, Magnesium)",
            "Advise on gypsum application for sodic soils and lime for acidic soils"
        ],
        "contact_channel": "District Soil Testing Laboratory / KVK Agronomy Clinic"
    },
    "Market Information": {
        "role": "Agricultural Marketing & Mandi Analyst",
        "title": "Agricultural Economist & Market Intelligence Officer",
        "department": "Directorate of Marketing & Inspection (Agmarknet & e-NAM Division)",
        "badge_color": "indigo",
        "turnaround_sla": "2-4 Hours",
        "description": "Specializes in real-time APMC mandi modal rates, Minimum Support Price (MSP) procurement, e-NAM registration, and warehouse receipt financing.",
        "routing_rationale": "Inquiry seeks price intelligence, MSP procurement centers, arrival volumes, or post-harvest storage options to maximize farm income.",
        "key_responsibilities": [
            "Provide real-time daily modal prices and arrival quantities across benchmark mandis",
            "Detail central government MSP procurement guidelines and NAFED/FCI centers",
            "Guide farmers on e-NAM digital trading, quality assaying, and payment settlement",
            "Advise on WDRA accredited warehouse receipts (e-NWR) and pledge financing"
        ],
        "contact_channel": "State Agricultural Marketing Board / Agmarknet Market Intelligence Helpdesk"
    }
}

DEFAULT_FALLBACK_ROUTING = {
    "role": "General Agricultural Extension Helpdesk",
    "title": "Kisan Call Centre (KCC) Level-1 Operator",
    "department": "Agricultural Extension General Advisory Services",
    "badge_color": "stone",
    "turnaround_sla": "Manual Review Required",
    "description": "General agricultural intake operator for queries with ambiguous, multi-topic, or low-confidence classification.",
    "routing_rationale": "Confidence threshold not met or query contains ambiguous phrasing requiring human clarification.",
    "key_responsibilities": [
        "Conduct follow-up interview with farmer to clarify specific crop symptoms",
        "Re-route inquiry to secondary specialist once details are confirmed",
        "Provide general seasonal advisory guidelines"
    ],
    "contact_channel": "National Kisan Call Centre (Toll-Free 1800-180-1551)"
}

def get_specialist_routing(category: str, is_low_confidence: bool = False) -> Dict[str, Any]:
    """Retrieve specialist routing profile for a predicted category."""
    if is_low_confidence or category not in ROUTING_DIRECTORY:
        return DEFAULT_FALLBACK_ROUTING
    return ROUTING_DIRECTORY[category]

