from fastapi import APIRouter
from app.schemas.risk import AnomalyResponse, GeoJSONFeatureCollection
from app.services.risk_service import RiskService

router = APIRouter(prefix="/risk", tags=["Risk & Anomalies"])

@router.get("/anomalies", response_model=AnomalyResponse, summary="Get Climate Anomaly Events")
def get_anomalies():
    return {"anomalies": RiskService.get_anomalies()}

@router.get("/hotspots/geojson", response_model=GeoJSONFeatureCollection, summary="Get GeoJSON Risk Hotspots for Mapbox GL")
def get_geojson_hotspots():
    return RiskService.get_geojson_hotspots()
