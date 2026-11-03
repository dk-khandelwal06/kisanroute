# KisanRoute 🌾

> **Project Tagline:** *Reading a farmer's question and knowing who should answer it — before a human has to.*
> 
> **Project Domain:** Agriculture + Applied Artificial Intelligence + Natural Language Processing
> 
> **Project Specification:** PROJECT 006 — KisanRoute

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.162-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.9.1-F7931E?logo=scikit-learn)](https://scikit-learn.org/)
[![Macro-F1](https://img.shields.io/badge/Macro--F1-91.25%25-success)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)]()

---

## 1. Executive Summary

**KisanRoute** is an intelligent farmer-query classification and routing platform that processes agricultural questions, identifies their operational domains using a trained Scikit-learn NLP pipeline, generates calibrated confidence scores, and deterministically recommends the appropriate agricultural extension specialist.

Instead of a generic SaaS dashboard or a static landing page, KisanRoute offers a **cinematic, editorial agricultural technology experience** communicating the relationship between Indian farming, agronomic science, and applied machine learning.

---

## 2. Key Capabilities

- **Genuine NLP Classification:** Trained Scikit-Learn pipeline (TF-IDF N-Gram Vectorizer + Multinomial Naive Bayes) achieving **91.43% test accuracy** and **91.25% Macro-F1** across 5 balanced agricultural taxonomy classes.
- **Calibrated Specialist Routing:** Maps inquiries directly into 5 specialized agronomic domains with dedicated turnaround SLAs, key focus areas, and extension contact channels:
  1. *Plant Protection* &rarr; Crop Protection & Pathology Specialist (2-4h SLA)
  2. *Weather* &rarr; Agricultural Meteorology Specialist (1-2h SLA)
  3. *Government Schemes* &rarr; Rural Scheme & Credit Liaison Officer (24-48h SLA)
  4. *Nutrient Management* &rarr; Agronomist & Soil Health Specialist (4-8h SLA)
  5. *Market Information* &rarr; Agricultural Marketing & Mandi Analyst (2-4h SLA)
- **Interactive Intelligence Lab:** Live interactive workbench with real-time multi-stage pipeline animations (*Ingestion &rarr; Cleaning &rarr; TF-IDF &rarr; Classification &rarr; Routing*).
- **Audio Accessibility:** Browser-native speech synthesis (`window.speechSynthesis`) allowing farmers and operators to listen to routing results without external proprietary voice APIs.
- **Out-of-Distribution Safeguard:** Inquiries below 35% confidence are flagged for human operator review to prevent erroneous dispatch.
- **Analytical Insights Dashboard:** Interactive Recharts visualizations displaying actual dataset distributions, 5x5 confusion matrix, and model comparison.
- **Refined Natural Color Palette:** Default warm ivory theme with a persistent deep forest dark mode.
- **Privacy & Security by Design:** Zero Personally Identifiable Information (PII) harvested; sliding-window rate limiting; server-side credential isolation.

---

## 3. Machine Learning Benchmark Comparison

Every score reflects genuine test set evaluation on a held-out 20% test split (70 samples across 5 balanced classes):

| Model Architecture | Test Accuracy | Macro Precision | Macro Recall | Macro-F1 | 5-Fold Stratified CV F1 |
|---|---|---|---|---|---|
| **Majority-Class Baseline** | 20.00% | 4.00% | 20.00% | 6.67% | 6.57% |
| **Logistic Regression (L-BFGS)** | 87.14% | 88.41% | 87.14% | 86.87% | 81.85% |
| **Multinomial Naive Bayes (alpha=0.3)** | **91.43%** | **91.99%** | **91.43%** | **91.25%** | **84.74% &plusmn; 1.9%** |

*Artifacts saved at `ml/models/best_model_pipeline.joblib` and served live via `/api/analytics`.*

---

## 4. Repository Structure

```
kisanroute/
├── datasets/
│   ├── kisanroute_queries.csv       # 350 curated benchmark samples across 5 classes
│   └── README.md                    # Data provenance, KCC-CHAKSHU access restrictions
├── ml/
│   ├── build_dataset.py             # Benchmark dataset compilation script
│   ├── train.py                     # Stratified training & evaluation pipeline
│   ├── models/                      # Serialized Joblib pipelines & vectorizer
│   ├── evaluation_metrics.json      # Genuine evaluation JSON (confusion matrix, reports)
│   └── model_metadata.json          # Vocabulary size, parameters, date trained
├── backend/
│   ├── main.py                      # FastAPI application, CORS, rate limiting, security headers
│   ├── api/
│   │   ├── routes.py                # Endpoints: /health, /model/info, /predict, /analytics, /explain
│   │   └── schemas.py               # Pydantic v2 schemas for request validation & response
│   ├── core/
│   │   ├── config.py                # Configuration loader
│   │   ├── nlp_engine.py            # Preprocessing, inference, probability calibration
│   │   ├── routing.py               # 5-domain specialist knowledge base
│   │   └── gemini_client.py         # Server-side Gemini rationale with domain fallback
│   ├── requirements.txt             # Python backend dependencies
│   ├── .env.example
│   └── .env                         # Server-side secrets (gitignored)
├── frontend/
│   ├── package.json                 # Next.js 15, React 19, Tailwind CSS, Framer Motion, Recharts
│   ├── tailwind.config.ts           # Warm ivory / Forest green semantic tokens
│   ├── app/
│   │   ├── layout.tsx               # Root layout, theme provider, metadata
│   │   ├── page.tsx                 # Full 13-section cinematic homepage
│   │   ├── how-it-works/page.tsx    # Technical pipeline deep-dive
│   │   ├── intelligence-lab/page.tsx# Focused query classification laboratory
│   │   ├── insights/page.tsx        # Recharts analytical dashboard with confusion matrix
│   │   ├── about/page.tsx           # Mission, architecture, ethics, and provenance
│   │   └── privacy/page.tsx         # Privacy policy, data safety, zero-PII statement
│   ├── components/                  # Section components (Hero, Motion, Lab, Network, etc.)
│   ├── lib/api.ts                   # Resilient TypeScript API client
│   └── public/logo.png              # Custom KisanRoute emblem
├── tests/
│   ├── test_nlp_pipeline.py         # Pytest ML pipeline & preprocessing tests
│   ├── test_api_endpoints.py        # Pytest FastAPI endpoint & schema tests
│   └── conftest.py                  # Pytest configuration
├── docs/
│   ├── DEPLOYMENT.md                # Vercel & Render step-by-step deployment guide
│   ├── ARCHITECTURE.md              # Complete technical architecture specification
│   └── ASSETS_MANIFEST.md           # Photography and media licensing documentation
├── .gitignore                       # Git exclusion rules (protects .env and caches)
├── .env.example                     # Environment configuration template
└── README.md                        # Master repository documentation
```

---

## 5. Local Setup & Execution

### Prerequisites
- Python 3.10+ (Tested on Python 3.13)
- Node.js 18+ (Tested on Node.js v26)

### 1. Backend Setup
```bash
# Clone the repository
git clone https://github.com/<your-username>/kisanroute.git
cd kisanroute

# Optional: Set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Run ML pipeline training (generates model artifacts and metrics)
python ml/train.py

# Launch FastAPI backend
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 2. Frontend Setup
```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Running Automated Tests

Run the backend and machine learning test suite using `pytest`:
```bash
python -m pytest -p no:anyio tests/ -v
```

Run the Next.js production build:
```bash
npm run build --prefix frontend
```

---

## 7. Deployment Instructions

- **Frontend:** Ready for zero-config deployment on **Vercel** (`Root Directory: frontend`, Environment Variable: `NEXT_PUBLIC_API_BASE_URL`).
- **Backend:** Ready for deployment on **Render** as a Python Web Service (`Build Command: pip install -r backend/requirements.txt && python ml/train.py`, `Start Command: uvicorn backend.main:app --host 0.0.0.0 --port $PORT`).

Detailed walkthrough available in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## 8. Provenance & Institutional Disclaimer

**KisanRoute** is an independent educational and applied machine learning research project.
- **Dataset Provenance:** The raw ICAR-IASRI KCC-CHAKSHU database requires restricted government institutional credentials. KisanRoute was trained on the verified **KisanRoute-AgriBench v1.0** benchmark dataset (350 balanced samples across 5 core agricultural domains) curated from public ICAR extension advisories and KCC inquiry archetypes.
- **No Official Affiliation:** This project is not affiliated with, endorsed by, or operated by the Indian Council of Agricultural Research (ICAR), the Kisan Call Centre (KCC), or the Ministry of Agriculture and Farmers Welfare.
- **No Direct Dispatch:** Recommended specialist routing identifies the scientific extension desk equipped to answer the question; it does not initiate an unconfirmed governmental dispatch.

---

## 9. License

Distributed under the MIT License. See `LICENSE` for details.

