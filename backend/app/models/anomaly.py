import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from app.db.session import Base

class Anomaly(Base):
    __tablename__ = "anomalies"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    location_name = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    variable = Column(String(100), nullable=False)
    observed_value = Column(Float, nullable=False)
    expected_value = Column(Float, nullable=False)
    anomaly_score = Column(Float, nullable=False)
    anomaly_type = Column(String(100), nullable=False) # Heat Wave, Cold Spike, Heavy Rainfall, Drought, Extreme Wind
    risk_level = Column(String(50), nullable=False) # High, Medium, Low, Normal
    detection_method = Column(String(100), default="Z-score / Isolation Forest")
    timestamp = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class RiskEvent(Base):
    __tablename__ = "risk_events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    severity = Column(String(50), nullable=False) # low, moderate, high, critical
    location = Column(String(255), nullable=False)
    description = Column(String(500), nullable=False)
    timestamp = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
