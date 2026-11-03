"""
Pydantic schemas for KisanRoute API requests and responses.
Provides strict validation, data sanitization, and structured documentation.
"""

from typing import Dict, List, Any, Optional
from pydantic import BaseModel, Field, field_validator

class PredictionRequest(BaseModel):
    query: str = Field(
        ...,
        min_length=3,
        max_length=1000,
        description="Farmer's agricultural inquiry (in English or transliterated agricultural phrasings).",
        examples=["My wheat leaves are turning yellow with brown spots. What should I spray?"]
    )

    @field_validator("query")
    @classmethod
    def sanitize_query(cls, v: str) -> str:
        cleaned = v.strip()
        if len(cleaned) < 3:
            raise ValueError("Query must contain at least 3 non-whitespace characters.")
        # Reject non-meaningful repetitive patterns
        if len(set(cleaned)) < 3 and len(cleaned) > 5:
            raise ValueError("Query appears to be repetitive characters.")
        return cleaned

class SpecialistInfo(BaseModel):
    role: str
    title: str
    department: str
    badge_color: str
    turnaround_sla: str
    description: str
    routing_rationale: str
    key_responsibilities: List[str]
    contact_channel: str

class ModelInfo(BaseModel):
    name: str
    version: str
    vocabulary_size: int
    latency_ms: float

class PredictionResponse(BaseModel):
    query: str
    cleaned_query: str
    predicted_category: str
    confidence: float
    confidence_level: str
    is_low_confidence: bool
    class_probabilities: Dict[str, float]
    specialist: SpecialistInfo
    model_info: ModelInfo
    processing_status: str

class ExplainRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=1000)
    predicted_category: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    specialist_role: str

class ExplainResponse(BaseModel):
    source: str
    explanation: str
    disclaimer: str

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_name: str
    categories: List[str]
    version: str
    timestamp: str

class ModelInfoResponse(BaseModel):
    model_name: str
    version: str
    pipeline_components: List[str]
    categories: List[str]
    vocabulary_size: int
    dataset_metadata: Dict[str, Any]
    evaluation_summary: Dict[str, Any]
