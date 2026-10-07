from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class AnomalyItemSchema(BaseModel):
    id: str
    date: str
    location: str
    variable: str
    anomalyType: str
    riskLevel: str
    observedValue: float
    expectedValue: float
    anomalyScore: float

class AnomalyResponse(BaseModel):
    anomalies: List[AnomalyItemSchema]

class GeoJSONFeatureGeometry(BaseModel):
    type: str = "Point"
    coordinates: List[float] # [lng, lat]

class GeoJSONFeatureProperties(BaseModel):
    id: str
    name: str
    riskLevel: str
    color: str
    anomaliesCount: int
    dominantAnomaly: str

class GeoJSONFeature(BaseModel):
    type: str = "Feature"
    geometry: GeoJSONFeatureGeometry
    properties: GeoJSONFeatureProperties

class GeoJSONFeatureCollection(BaseModel):
    type: str = "FeatureCollection"
    features: List[GeoJSONFeature]
