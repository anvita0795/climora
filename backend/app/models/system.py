import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, JSON
from app.db.session import Base

class SystemEvent(Base):
    __tablename__ = "system_events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    time = Column(String(50), nullable=False)
    event = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False) # Success, Info, Warning, Error
    details = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SystemMetric(Base):
    __tablename__ = "system_metrics"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    component = Column(String(100), nullable=False) # CPU, GPU, Memory, Storage
    usage_percent = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
