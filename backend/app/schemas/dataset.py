from pydantic import BaseModel
from typing import List, Optional, Any

class DatasetOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    source: str
    type: str
    format: str
    variables: List[str]
    spatialResolution: str
    temporalResolution: str
    timeRange: str
    records: str
    size: str
    lastUpdated: str
    status: str

    class Config:
        from_attributes = True

class DatasetPreviewResponse(BaseModel):
    dataset_id: str
    name: str
    columns: List[str]
    records: List[dict]
    total_records: int
