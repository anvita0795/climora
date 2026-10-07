from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ClimateMetricsSchema(BaseModel):
    temperature: float
    feelsLike: float
    conditionText: str
    humidity: int
    windSpeed: float
    precipitation: int
    airQuality: str

class ClimateSummarySchema(BaseModel):
    location: str
    region: str
    country: str
    coordinates: dict
    climateIndex: float
    statusText: str
    metrics: ClimateMetricsSchema
    lastUpdated: str

class RiskSummarySchema(BaseModel):
    level: str
    score: int
    drivers: List[str]
    forecastPeriod: str
    summary: str

class ForecastDaySchema(BaseModel):
    day: str
    condition: str
    highTemp: int
    lowTemp: int

class TrendPointSchema(BaseModel):
    time: str
    temperature: float
    rainfall: float
    co2: float
    anomalyScore: float

class KpiMetricSchema(BaseModel):
    id: str
    label: str
    value: str
    change: Optional[str] = None
    changeType: Optional[str] = None
    subtext: str
    iconName: str

class ModelStatusItemSchema(BaseModel):
    id: str
    name: str
    algorithm: str
    status: str
    version: str
    latencyMs: float

class IntelligenceEventSchema(BaseModel):
    id: str
    title: str
    category: str
    severity: str
    timestamp: str
    location: str
    description: str

class DashboardSummaryResponse(BaseModel):
    summary: ClimateSummarySchema
    riskSummary: RiskSummarySchema
    kpiMetrics: List[KpiMetricSchema]
    forecast: List[ForecastDaySchema]
    trendData: List[TrendPointSchema]
    modelStatuses: List[ModelStatusItemSchema]
    recentIntelligence: List[IntelligenceEventSchema]
    provenance: Optional[Dict[str, Any]] = None
