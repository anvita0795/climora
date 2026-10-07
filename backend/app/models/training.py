import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, JSON
from app.db.session import Base

class TrainingJob(Base):
    __tablename__ = "training_jobs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    model_name = Column(String(255), nullable=False)
    dataset_name = Column(String(255), nullable=False)
    status = Column(String(50), default="Queued") # Completed, Training, Queued, Failed, Paused
    progress = Column(Integer, default=0)
    started_at = Column(String(50), nullable=False)
    completed_at = Column(String(50), nullable=True)
    logs_summary = Column(String(500), nullable=True)
    metrics = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
