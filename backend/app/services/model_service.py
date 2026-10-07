from typing import List, Dict, Any
import uuid

class ModelService:
    @staticmethod
    def get_models() -> List[dict]:
        return [
            {
                "id": "mod-1",
                "name": "XGBoost (Ensemble)",
                "algorithm": "Gradient Boosting Trees",
                "variable": "Temperature Prediction",
                "version": "v2.4.1",
                "status": "Operational",
                "accuracy": 91.0,
                "precision": 86.0,
                "recall": 89.0,
                "latency_ms": 12.4,
                "created_at": "2026-10-01"
            },
            {
                "id": "mod-2",
                "name": "LightGBM",
                "algorithm": "Light Gradient Boosting",
                "variable": "Rainfall Prediction",
                "version": "v1.8.0",
                "status": "Operational",
                "accuracy": 75.0,
                "precision": 72.0,
                "recall": 76.0,
                "latency_ms": 8.5,
                "created_at": "2026-09-28"
            },
            {
                "id": "mod-3",
                "name": "LSTM",
                "algorithm": "Recurrent Deep Neural Net",
                "variable": "CO₂ Prediction",
                "version": "v3.1.0",
                "status": "Operational",
                "accuracy": 66.0,
                "precision": 71.0,
                "recall": 73.0,
                "latency_ms": 42.0,
                "created_at": "2026-09-25"
            },
            {
                "id": "mod-4",
                "name": "Random Forest",
                "algorithm": "Random Forest Regressor",
                "variable": "Environmental Index",
                "version": "v1.2.0",
                "status": "Standby",
                "accuracy": 61.0,
                "precision": 65.0,
                "recall": 69.0,
                "latency_ms": 18.2,
                "created_at": "2026-09-20"
            }
        ]

    @staticmethod
    def get_training_jobs() -> List[dict]:
        return [
            {
                "id": "job-1",
                "model": "XGBoost (Ensemble)",
                "dataset": "Climate Historical",
                "status": "Completed",
                "progress": 100,
                "started": "Oct 02, 2026"
            },
            {
                "id": "job-2",
                "model": "LSTM",
                "dataset": "Time Series (1980–2023)",
                "status": "Training",
                "progress": 68,
                "started": "Oct 02, 2026"
            },
            {
                "id": "job-3",
                "model": "LightGBM",
                "dataset": "Multi-Variable",
                "status": "Queued",
                "progress": 0,
                "started": "Oct 02, 2026"
            },
            {
                "id": "job-4",
                "model": "Random Forest",
                "dataset": "Environmental",
                "status": "Completed",
                "progress": 100,
                "started": "Oct 01, 2026"
            }
        ]

    @staticmethod
    def start_training_job(model_type: str, dataset_name: str) -> dict:
        job_id = f"job-{uuid.uuid4().hex[:6]}"
        return {
            "id": job_id,
            "model": model_type,
            "dataset": dataset_name,
            "status": "Queued",
            "progress": 0,
            "started": "Just now"
        }
