import os
import pandas as pd
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.dashboard import DashboardSummaryResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard Overview"])

@router.get("/summary", response_model=DashboardSummaryResponse, summary="Get Overview Dashboard Summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    csv_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "..", "data", "samples", "chennai_monthly_1980_2023.csv"
    )
    
    current_temp = 32.4
    co2_val = 421.5
    humidity_val = 78
    
    if os.path.exists(csv_path):
        try:
            df = pd.read_csv(csv_path)
            if not df.empty:
                last_row = df.iloc[-1]
                current_temp = float(last_row.get('temperature', 32.4))
                co2_val = float(last_row.get('co2', 421.5))
                humidity_val = int(last_row.get('humidity', 78))
        except Exception:
            pass

    return {
        "summary": {
            "location": "Chennai",
            "region": "Tamil Nadu",
            "country": "India",
            "coordinates": {"lat": 13.0827, "lng": 80.2707},
            "climateIndex": 74.2,
            "statusText": "Elevated Marine Heatwave & Humidity Warning",
            "metrics": {
                "temperature": round(current_temp, 1),
                "feelsLike": round(current_temp + 5.7, 1),
                "conditionText": "Partly Cloudy with Coastal Haze",
                "humidity": humidity_val,
                "windSpeed": 14.5,
                "precipitation": 25,
                "airQuality": "Moderate (AQI 68)"
            },
            "lastUpdated": "Live • Just now"
        },
        "riskSummary": {
            "level": "HIGH",
            "score": 78,
            "drivers": [
                "Sea surface temperature anomaly (+1.8°C)",
                f"Persistent high atmospheric humidity ({humidity_val}%)",
                "Precipitation deficit over inland catchment"
            ],
            "forecastPeriod": "Next 72 Hours",
            "summary": "High risk of localized heat stress and flash precipitation anomalies along the coastal corridor."
        },
        "kpiMetrics": [
            {
              "id": "temp-anomaly",
              "label": "Temperature Anomaly",
              "value": "+2.4°C",
              "change": "+0.4°C vs 30-yr avg",
              "changeType": "negative",
              "subtext": "Baseline: 1980-2022 Sample CSV",
              "iconName": "Thermometer"
            },
            {
              "id": "co2-level",
              "label": "CO₂ Concentration",
              "value": f"{co2_val:.1f} ppm",
              "change": "+2.3 ppm YoY",
              "changeType": "negative",
              "subtext": "Historical sample trend",
              "iconName": "Wind"
            },
            {
              "id": "sea-level",
              "label": "Sea Level Anomaly",
              "value": "+3.8 mm",
              "change": "+0.3 mm this yr",
              "changeType": "negative",
              "subtext": "Satellite altimetry data",
              "iconName": "Droplets"
            },
            {
              "id": "climate-index",
              "label": "Climate Risk Index",
              "value": "74.2 / 100",
              "change": "High Risk Zone",
              "changeType": "warning",
              "subtext": "Multi-variable composite",
              "iconName": "AlertTriangle"
            }
        ],
        "forecast": [
            {"day": "Mon", "condition": "sun-cloud", "highTemp": 34, "lowTemp": 27},
            {"day": "Tue", "condition": "rain", "highTemp": 31, "lowTemp": 25},
            {"day": "Wed", "condition": "rain", "highTemp": 30, "lowTemp": 24},
            {"day": "Thu", "condition": "sun-cloud", "highTemp": 33, "lowTemp": 26},
            {"day": "Fri", "condition": "cloud", "highTemp": 32, "lowTemp": 26}
        ],
        "trendData": [
            {"time": "00:00", "temperature": round(current_temp - 5.2, 1), "rainfall": 0.0, "co2": co2_val - 0.7, "anomalyScore": 0.35},
            {"time": "04:00", "temperature": round(current_temp - 5.9, 1), "rainfall": 0.0, "co2": co2_val - 0.5, "anomalyScore": 0.28},
            {"time": "08:00", "temperature": round(current_temp - 2.6, 1), "rainfall": 0.2, "co2": co2_val - 0.2, "anomalyScore": 0.52},
            {"time": "12:00", "temperature": round(current_temp + 1.7, 1), "rainfall": 1.5, "co2": co2_val + 0.3, "anomalyScore": 0.78},
            {"time": "16:00", "temperature": round(current_temp + 0.4, 1), "rainfall": 8.4, "co2": co2_val + 0.1, "anomalyScore": 0.85},
            {"time": "20:00", "temperature": round(current_temp - 3.0, 1), "rainfall": 2.1, "co2": co2_val - 0.1, "anomalyScore": 0.62}
        ],
        "modelStatuses": [
            {"id": "m1", "name": "XGBoost Temperature", "algorithm": "Gradient Boosting", "status": "Operational", "version": "v2.4.1", "latencyMs": 12.4},
            {"id": "m2", "name": "LightGBM Precipitation", "algorithm": "Light GBDT", "status": "Operational", "version": "v1.8.0", "latencyMs": 8.5},
            {"id": "m3", "name": "LSTM Neural Network", "algorithm": "Recurrent Net", "status": "Operational", "version": "v3.1.0", "latencyMs": 42.0}
        ],
        "recentIntelligence": [
            {
              "id": "evt-1",
              "title": "Thermal Anomaly Spike Detected",
              "category": "Thermal",
              "severity": "high",
              "timestamp": "12 mins ago",
              "location": "Chennai North Port Zone",
              "description": "Surface temperature exceeded 95th historical percentile for 3 consecutive hours."
            },
            {
              "id": "evt-2",
              "title": "Precipitation Convergence Band",
              "category": "Precipitation",
              "severity": "moderate",
              "timestamp": "45 mins ago",
              "location": "Bay of Bengal Coastal Sector",
              "description": "Convective storm formation identified via satellite remote sensing feed."
            }
        ],
        "provenance": {
            "source": "sample_csv",
            "snapshot": "2026-10-07",
            "sha": "demo-sample"
        }
    }
