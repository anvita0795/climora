from fastapi import APIRouter, Query
from app.schemas.explainability import ShapValuesResponse
from app.ml.explainability.shap_engine import shap_engine

router = APIRouter(prefix="/explain", tags=["Explainability (SHAP)"])

@router.post("/shap-values", response_model=ShapValuesResponse, summary="Compute SHAP Feature Explainability Values")
def get_shap_values(prediction_id: str = Query("pred-latest", description="Prediction ID")):
    return shap_engine.compute_shap_analysis(prediction_id=prediction_id)
