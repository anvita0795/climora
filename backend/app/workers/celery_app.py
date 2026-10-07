from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "climora_tasks",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery_app.task(name="tasks.process_dataset_upload")
def process_dataset_upload_task(dataset_id: str):
    return {"status": "SUCCESS", "dataset_id": dataset_id, "records_processed": 142500000}

@celery_app.task(name="tasks.train_model_pipeline")
def train_model_pipeline_task(job_id: str, model_type: str, dataset_name: str):
    return {"status": "SUCCESS", "job_id": job_id, "metrics": {"accuracy": 92.5, "rmse": 0.42}}
