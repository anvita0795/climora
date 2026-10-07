from pydantic import BaseModel
from typing import List, Dict, Any

class CorrelationResponse(BaseModel):
    variables: List[str]
    matrix: List[List[float]]
    method: str = "Pearson"
    sample_count: int

class DecompositionPoint(BaseModel):
    timestamp: str
    observed: float
    trend: float
    seasonal: float
    residual: float

class DecompositionResponse(BaseModel):
    location: str
    variable: str
    points: List[DecompositionPoint]
