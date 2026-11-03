# KisanRoute — System Architecture & Technical Specifications

**Tagline:** Reading a farmer's question and knowing who should answer it — before a human has to.

---

## 1. High-Level Architecture

```
                  ┌────────────────────────────────────────┐
                  │    KisanRoute Web Client (Next.js)     │
                  │   - App Router, React 19, Tailwind CSS │
                  │   - Framer Motion, Recharts Analytics  │
                  │   - Persistent Light/Dark Mode Switch  │
                  │   - Web Speech API Native Read-Aloud   │
                  └───────────────────┬────────────────────┘
                                      │ HTTPS POST /api/predict
                                      ▼
                  ┌────────────────────────────────────────┐
                  │       FastAPI Gateway (Python)         │
                  │   - Pydantic v2 Schema Sanitization    │
                  │   - In-Memory Sliding Rate Limiting    │
                  │   - Security Headers (nosniff, DENY)   │
                  └───────────────────┬────────────────────┘
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
┌───────────────────────────┐                       ┌───────────────────────────┐
│     Scikit-Learn NLP      │                       │     Routing Knowledge     │
│ - Text Normalization      │                       │ - 5 Specialist Dossiers   │
│ - Sublinear TF-IDF (1,2)  │                       │ - Turnaround SLAs (1-48h) │
│ - Multinomial Naive Bayes │                       │ - Key Responsibilities    │
│ - Probability Calibration │                       │ - Direct Extension Lines  │
└───────────┬───────────────┘                       └─────────────┬─────────────┘
            │                                                     │
            └─────────────────────────┬───────────────────────────┘
                                      │ (Optional Server-Side)
                                      ▼
                  ┌────────────────────────────────────────┐
                  │     Gemini 2.5 Flash Explainer         │
                  │   - Server-Side HTTP Only              │
                  │   - Grounded in Classifier Category    │
                  │   - Deterministic Fallback Rules       │
                  └────────────────────────────────────────┘
```

---

## 2. Machine Learning Pipeline Details

### 2.1 Preprocessing (`ml/train.py` & `backend/core/nlp_engine.py`)
- Standardizes text to lowercase.
- Normalizes excess whitespace and strips non-alphanumeric noise while preserving domain tokens (e.g., `PM-KISAN`, `e-NAM`, `NPK`).
- Operates identically between offline training and real-time backend inference.

### 2.2 Feature Representation
- **Model:** `TfidfVectorizer(ngram_range=(1,2), max_features=2500, sublinear_tf=True)`
- **N-Gram Coverage:** Unigrams and bigrams capture agricultural co-occurrences like `"yellow rust"`, `"stem borer"`, `"mandi bhav"`, `"crop insurance"`.
- **Leakage Prevention:** Fitted strictly on the 80% training split.

### 2.3 Model Evaluation & Comparison
Evaluated on a held-out 20% test split (70 samples across 5 balanced classes):

| Model Name | Test Accuracy | Macro Precision | Macro Recall | Macro-F1 | 5-Fold CV F1 |
|---|---|---|---|---|---|
| **Majority-Class Baseline** | 20.00% | 4.00% | 20.00% | 6.67% | 6.57% |
| **Logistic Regression (L-BFGS)** | 87.14% | 88.41% | 87.14% | 86.87% | 81.85% |
| **Multinomial Naive Bayes (alpha=0.3)** | **91.43%** | **91.99%** | **91.43%** | **91.25%** | **84.74%** |

**Selection:** Multinomial Naive Bayes delivered the strongest Macro-F1 (91.25%) with high cross-validation stability (&plusmn;1.9%), and was serialized to `ml/models/best_model_pipeline.joblib`.

---

## 3. Specialist Routing Knowledge Base

| Domain | Assigned Specialist | Department | Turnaround SLA | Key Focus Areas |
|---|---|---|---|---|
| **Plant Protection** | Crop Protection & Pathology Specialist | Division of Plant Pathology & IPM Clinic | 2-4 Hours | Fungal blights, rusts, stem borer, whitefly, IPM thresholds, pesticide dosages. |
| **Weather** | Agricultural Meteorology Specialist | Agromet Advisory Field Unit (AMFU) / IMD | 1-2 Hours | Rain alerts, frost mitigation (light night irrigation), hailstorms, spraying windows. |
| **Government Schemes** | Rural Scheme & Credit Liaison Officer | District Agriculture Office (DBT & Insurance) | 24-48 Hours | PM-KISAN verification, PMFBY 72-hour loss claims, KCC interest subvention, solar pumps. |
| **Nutrient Management** | Agronomist & Soil Health Specialist | Division of Soil Science & Chemistry | 4-8 Hours | Soil Health Card interpretation, balanced NPK split application, zinc deficiency, gypsum. |
| **Market Information** | Agricultural Marketing & Mandi Analyst | Directorate of Marketing & Inspection | 2-4 Hours | APMC daily modal prices, MSP procurement guidelines, e-NAM digital auctions, warehouses. |

---

## 4. API Endpoints Specification

### `GET /api/health`
Returns service status, model availability, and current timestamp.
```json
{
  "status": "HEALTHY",
  "model_loaded": true,
  "model_name": "Multinomial Naive Bayes",
  "categories": ["Government Schemes", "Market Information", "Nutrient Management", "Plant Protection", "Weather"],
  "version": "1.0.0",
  "timestamp": "2026-11-03T13:30:00Z"
}
```

### `POST /api/predict`
Ingests an agricultural query and returns predicted category, calibrated confidence, probability distribution, and assigned specialist dossier.

**Request:**
```json
{
  "query": "My wheat leaves are turning yellow with brown spots. What should I spray?"
}
```

**Response:**
```json
{
  "query": "My wheat leaves are turning yellow with brown spots. What should I spray?",
  "cleaned_query": "my wheat leaves are turning yellow with brown spots what should i spray",
  "predicted_category": "Plant Protection",
  "confidence": 0.825,
  "confidence_level": "High",
  "is_low_confidence": false,
  "class_probabilities": {
    "Government Schemes": 0.009,
    "Market Information": 0.012,
    "Nutrient Management": 0.089,
    "Plant Protection": 0.825,
    "Weather": 0.065
  },
  "specialist": {
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
  "model_info": {
    "name": "Multinomial Naive Bayes",
    "version": "1.0.0",
    "vocabulary_size": 1250,
    "latency_ms": 11.4
  },
  "processing_status": "SUCCESS"
}
```

### `GET /api/analytics`
Returns full genuine dataset and evaluation metrics JSON for analytical rendering.

### `POST /api/explain`
Generates a grounded explanation of the routing rationale via server-side Gemini 2.5 Flash, with deterministic rule fallback.
