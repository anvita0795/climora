from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class LocationInput(BaseModel):
    latitude: float
    longitude: float

class PredictionInferenceRequest(BaseModel):
    location: Optional[LocationInput] = None
    location_name: Optional[str] = "Chennai, India"
    variable: str = "temperature"
    scenario: str = "SSP5-8.5" # SSP1-2.6, SSP2-4.5, SSP5-8.5
    horizon_year: int = 2050
    ensemble_weights: Dict[str, float] = Field(
        default_factory=lambda: {"xgboost": 0.4, "lightgbm": 0.3, "lstm": 0.3}
    )

class PredictionPointSchema(BaseModel):
    timestamp: str
    prediction: float
    lower: float
    upper: float

class PredictionInferenceResponse(BaseModel):
    prediction_id: str
    variable: str
    scenario: str
    horizon_year: int
    confidence_level: float
    ensemble_weights: Dict[str, float]
    points: List[PredictionPointSchema]
    created_at: str
