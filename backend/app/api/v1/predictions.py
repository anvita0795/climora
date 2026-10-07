from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PredictionInferenceRequest, PredictionInferenceResponse
from app.ml.inference.predictor import predictor_engine

router = APIRouter(prefix="/predictions", tags=["Climate Predictions"])

@router.post("/inference", response_model=PredictionInferenceResponse, summary="Run Climate Prediction Ensemble Inference")
def run_prediction_inference(req: PredictionInferenceRequest):
    if req.scenario not in ["SSP1-2.6", "SSP2-4.5", "SSP5-8.5"]:
        raise HTTPException(status_code=400, detail="Unsupported SSP scenario")
        
    return predictor_engine.predict_scenario(
        location_name=req.location_name or "Chennai, India",
        variable=req.variable,
        scenario=req.scenario,
        horizon_year=req.horizon_year,
        ensemble_weights=req.ensemble_weights
    )
