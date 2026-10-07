import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from app.db.session import Base

class ModelRegistry(Base):
    __tablename__ = "model_registry"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    algorithm = Column(String(100), nullable=False) # XGBoost, LightGBM, LSTM, Random Forest
    variable = Column(String(100), nullable=False)
    version = Column(String(50), nullable=False)
    status = Column(String(50), default="Operational") # Operational, Standby, Updating
    accuracy = Column(Float, nullable=True)
    precision = Column(Float, nullable=True)
    recall = Column(Float, nullable=True)
    latency_ms = Column(Float, default=12.0)
    artifact_location = Column(String(500), nullable=True)
    training_dataset = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
