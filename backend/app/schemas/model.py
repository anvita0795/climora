from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ModelItemSchema(BaseModel):
    id: str
    name: str
    algorithm: str
    variable: str
    version: str
    status: str
    accuracy: Optional[float] = None
    precision: Optional[float] = None
    recall: Optional[float] = None
    latency_ms: float
    created_at: str

class TrainingJobRequest(BaseModel):
    model_type: str = "xgboost"
    variable: str = "temperature"
    dataset_name: str = "Climate Historical"
    parameters: Optional[Dict[str, Any]] = None

class TrainingJobSchema(BaseModel):
    id: str
    model: str
    dataset: str
    status: str
    progress: int
    started: str
