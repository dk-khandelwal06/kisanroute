# KisanRoute — Deployment & Production Guide

This guide details step-by-step instructions for publishing KisanRoute to GitHub, deploying the Next.js frontend to **Vercel**, and deploying the FastAPI machine learning backend to **Render**.

---

## Architecture Overview
```
Farmer Inquiries (Web/Mobile)
           │
           ▼
   [ Vercel CDN ] ─── Next.js 15 App Router Frontend
           │
      HTTPS REST
           │
           ▼
   [ Render Web Service ] ─── FastAPI + Scikit-Learn NLP Pipeline
                                 ├── TF-IDF Vectorizer
                                 ├── Multinomial Naive Bayes Classifier
                                 ├── Confidence Calibrator
                                 ├── Specialist Routing Knowledge Base
                                 └── (Optional) Server-Side Gemini API
```

---

## 1. GitHub Repository Setup

1. **Verify Git Status and Clean Environment:**
   Ensure no secret `.env` files or temporary caches are tracked:
   ```bash
   git status
   ```
2. **Stage and Commit all Project Code:**
   ```bash
   git add .
   git commit -m "feat: complete KisanRoute agricultural NLP platform (Project 006)"
   ```
3. **Create a New GitHub Repository:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `kisanroute`
   - Visibility: Public or Private
   - Do NOT initialize with a README (one is already prepared).
4. **Push Local Code to GitHub:**
   ```bash
   git remote add origin https://github.com/<your-username>/kisanroute.git
   git branch -M main
   git push -u origin main
   ```

---

## 2. Deploy Python Backend to Render

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** &rarr; **Web Service**.
3. Connect your GitHub repository (`kisanroute`).
4. Configure the Web Service settings:
   - **Name:** `kisanroute-api`
   - **Region:** Singapore / Frankfurt / Oregon (select closest to target users)
   - **Branch:** `main`
   - **Root Directory:** Leave blank (or set to `.`)
   - **Runtime:** `Python 3`
   - **Build Command:**
     ```bash
     pip install -r backend/requirements.txt && python ml/train.py
     ```
   - **Start Command:**
     ```bash
     uvicorn backend.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Instance Type:** `Free` or `Starter`
5. Configure Environment Variables in Render:
   | Key | Value | Notes |
   |---|---|---|
   | `ENV` | `production` | Enables production security policies |
   | `ALLOWED_ORIGINS` | `https://kisanroute.vercel.app` | Comma-separated list of allowed web domains |
   | `MODEL_PATH` | `ml/models/best_model_pipeline.joblib` | Path to serialized pipeline |
   | `METRICS_PATH` | `ml/evaluation_metrics.json` | Path to genuine evaluation JSON |
   | `METADATA_PATH` | `ml/model_metadata.json` | Path to metadata |
   | `GEMINI_API_KEY` | `<your-api-key>` | Optional: Server-side Gemini rationale |
   | `RATE_LIMIT_PER_MINUTE` | `60` | In-memory sliding rate limit |
   | `CONFIDENCE_THRESHOLD` | `0.35` | Flags ambiguous queries below 35% |

6. Click **Create Web Service**.
7. Once deployed, test the health check URL:
   ```bash
   curl https://kisanroute-api.onrender.com/api/health
   ```
   Expected response:
   ```json
   {
     "status": "HEALTHY",
     "model_loaded": true,
     "model_name": "Multinomial Naive Bayes",
     "categories": ["Government Schemes", "Market Information", "Nutrient Management", "Plant Protection", "Weather"],
     "version": "1.0.0"
   }
   ```

---

## 3. Deploy Frontend to Vercel

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** &rarr; **Project**.
3. Import your GitHub repository (`kisanroute`).
4. In the **Configure Project** screen:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** Click Edit and select `frontend`.
   - **Build Command:** `npm run build` (Default)
   - **Output Directory:** `.next` (Default)
5. In **Environment Variables**, add:
   | Key | Value | Description |
   |---|---|---|
   | `NEXT_PUBLIC_API_BASE_URL` | `https://kisanroute-api.onrender.com` | URL of your deployed Render backend |

   > **Important Security Rule:** Never place secret credentials (like `GEMINI_API_KEY`) in `NEXT_PUBLIC_` variables. They are compiled into client browser bundles.

6. Click **Deploy**.
7. Vercel will build and assign a domain (e.g., `https://kisanroute.vercel.app`).

---

## 4. Connect and Verify Production Communication

1. Copy your Vercel deployment URL (e.g., `https://kisanroute.vercel.app`).
2. Go back to your Render Dashboard &rarr; `kisanroute-api` &rarr; **Environment**.
3. Ensure `ALLOWED_ORIGINS` includes your exact Vercel URL.
4. Open your live Vercel website in a browser.
5. Navigate to `/intelligence-lab`.
6. Submit a sample query:
   > *"My wheat leaves are turning yellow with brown spots. What should I spray?"*
7. Verify:
   - Processing animation advances across all 5 stages.
   - Result card renders with category: `Plant Protection`.
   - Confidence meter renders with real calibrated percentage (~82.5%).
   - Speech synthesis read-aloud works.
   - AI / Domain explanation card populates.
8. Navigate to `/insights` and verify the 5x5 confusion matrix and Recharts bar diagrams render seamlessly.

---

## 5. Local Development Quickstart

To run the entire full-stack application locally:

### Terminal 1: Backend
```bash
# From workspace root
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.
