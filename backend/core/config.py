"""
Backend configuration settings.
Loads from environment variables or .env file cleanly without external dependencies.
"""

import os
from typing import List

# Read .env if present
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

class Settings:
    PROJECT_NAME: str = "KisanRoute Agricultural NLP API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    ENV: str = os.getenv("ENV", "development")
    
    ALLOWED_ORIGINS: List[str] = [
        origin.strip() for origin in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000,https://kisanroute.vercel.app,*"
        ).split(",")
    ]
    
    # Base directory of repository
    BASE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    MODEL_PATH: str = os.getenv("MODEL_PATH", os.path.join(BASE_DIR, "ml", "models", "best_model_pipeline.joblib"))
    METRICS_PATH: str = os.getenv("METRICS_PATH", os.path.join(BASE_DIR, "ml", "evaluation_metrics.json"))
    METADATA_PATH: str = os.getenv("METADATA_PATH", os.path.join(BASE_DIR, "ml", "model_metadata.json"))
    
    # Server-side Gemini API Key (Loaded securely from environment only)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "").strip()
    
    # Rate Limiting & Safety
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    CONFIDENCE_THRESHOLD: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.35"))
    MAX_QUERY_LENGTH: int = 1000
    MIN_QUERY_LENGTH: int = 3

settings = Settings()
