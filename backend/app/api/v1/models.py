from fastapi import APIRouter, status
from typing import List
from app.schemas.model import ModelItemSchema, TrainingJobSchema, TrainingJobRequest
from app.services.model_service import ModelService

router = APIRouter(prefix="/models", tags=["Model Management"])

@router.get("", response_model=List[ModelItemSchema], summary="List Registered Models")
def get_models():
    return ModelService.get_models()

@router.get("/training", response_model=List[TrainingJobSchema], summary="Get Training Jobs Status")
def get_training_jobs():
    return ModelService.get_training_jobs()

@router.post("/train", response_model=TrainingJobSchema, status_code=status.HTTP_202_ACCEPTED, summary="Trigger Background Model Retraining Job")
def trigger_training(req: TrainingJobRequest):
    return ModelService.start_training_job(req.model_type, req.dataset_name)
