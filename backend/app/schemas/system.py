from pydantic import BaseModel
from typing import List, Optional

class SystemResourceSchema(BaseModel):
    id: str
    name: str
    usage: int
    color: str
    sparklineData: List[dict]

class SystemActivitySchema(BaseModel):
    id: str
    time: str
    event: str
    status: str

class SystemHealthItemSchema(BaseModel):
    id: str
    component: str
    status: str
    latency: str
    uptime: str
    lastChecked: str

class SystemTelemetryResponse(BaseModel):
    cpu: float
    gpu: Optional[float] = None
    memory: float
    storage: float
    healthy: bool
