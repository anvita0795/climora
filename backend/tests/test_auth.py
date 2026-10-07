import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_dashboard_summary():
    response = client.get("/api/v1/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert "riskSummary" in data
    assert "kpiMetrics" in data

def test_datasets_endpoints():
    response = client.get("/api/v1/datasets")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

    preview_res = client.get(f"/api/v1/datasets/{data[0]['id']}/preview?limit=5")
    assert preview_res.status_code == 200
    assert "records" in preview_res.json()

def test_analysis_endpoints():
    corr_res = client.get("/api/v1/analysis/correlation?method=Pearson")
    assert corr_res.status_code == 200
    assert "matrix" in corr_res.json()

    stl_res = client.get("/api/v1/analysis/decomposition?location=Chennai&variable=Temperature")
    assert stl_res.status_code == 200
    assert "points" in stl_res.json()

def test_prediction_inference_real_xgboost():
    payload = {
        "variable": "temperature",
        "scenario": "SSP5-8.5",
        "horizon_year": 2050,
        "ensemble_weights": {"xgboost": 0.4, "lightgbm": 0.3, "lstm": 0.3}
    }
    response = client.post("/api/v1/predictions/inference", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "points" in data
    assert len(data["points"]) > 0
    assert data["points"][0]["prediction"] > 0

def test_risk_anomalies_and_geojson():
    res_anom = client.get("/api/v1/risk/anomalies")
    assert res_anom.status_code == 200
    assert "anomalies" in res_anom.json()

    res_geo = client.get("/api/v1/risk/hotspots/geojson")
    assert res_geo.status_code == 200
    assert res_geo.json()["type"] == "FeatureCollection"
    assert len(res_geo.json()["features"]) > 0

def test_explainability_shap_tree_explainer():
    response = client.post("/api/v1/explain/shap-values?prediction_id=test-1")
    assert response.status_code == 200
    data = response.json()
    assert "global_importance" in data
    assert "waterfall" in data
    assert "beeswarm" in data

def test_models_and_system_telemetry():
    models_res = client.get("/api/v1/models")
    assert models_res.status_code == 200
    assert isinstance(models_res.json(), list)

    telemetry_res = client.get("/api/v1/system/telemetry")
    assert telemetry_res.status_code == 200
    assert "cpu" in telemetry_res.json()
