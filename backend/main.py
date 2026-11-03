"""
KisanRoute FastAPI Application Entrypoint
Provides production-oriented API server for agricultural query classification,
specialist routing, analytics, and AI explanation.
"""

from contextlib import asynccontextmanager
import logging
import time
from typing import Dict
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.api.routes import router as api_router
from backend.core.config import settings
from backend.core.nlp_engine import nlp_engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("kisanroute")

# In-memory rate limiting dictionary {ip: [timestamps]}
RATE_LIMIT_STORAGE: Dict[str, list] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}")
    logger.info(f"Model loaded: {nlp_engine.is_loaded}")
    yield
    logger.info("Shutting down KisanRoute API")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Intelligent Farmer-Query Classification & Specialist Routing Platform",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.ENV == "development" else settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Custom Rate Limiting & Security Headers Middleware
@app.middleware("http")
async def security_and_rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host if request.client else "unknown"
    current_time = time.time()
    
    # Clean old requests (> 60 seconds)
    if client_ip in RATE_LIMIT_STORAGE:
        RATE_LIMIT_STORAGE[client_ip] = [
            t for t in RATE_LIMIT_STORAGE[client_ip] if current_time - t < 60
        ]
    else:
        RATE_LIMIT_STORAGE[client_ip] = []
        
    # Check limit for /api/predict and /api/explain
    if request.url.path.startswith("/api/predict") or request.url.path.startswith("/api/explain"):
        if len(RATE_LIMIT_STORAGE[client_ip]) >= settings.RATE_LIMIT_PER_MINUTE:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "detail": "Rate limit exceeded. Please wait a minute before submitting further inquiries.",
                    "status": "RATE_LIMITED"
                }
            )
        RATE_LIMIT_STORAGE[client_ip].append(current_time)

    # Process request
    response = await call_next(request)
    
    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    
    return response

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception at {request.url.path}: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "An internal processing error occurred. Please try again later.",
            "path": request.url.path
        }
    )

# Include API Router
app.include_router(api_router)

@app.get("/")
async def root():
    return {
        "project": "KisanRoute",
        "tagline": "Reading a farmer's question and knowing who should answer it — before a human has to.",
        "version": settings.VERSION,
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
