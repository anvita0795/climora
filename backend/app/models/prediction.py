import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship
from app.db.session import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    variable = Column(String(100), nullable=False)
    scenario = Column(String(100), nullable=False) # SSP1-2.6, SSP2-4.5, SSP5-8.5
    horizon_year = Column(Integer, nullable=False)
    confidence_level = Column(Float, default=0.95)
    ensemble_weights = Column(JSON, nullable=False)
    location_name = Column(String(255), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    points = relationship("PredictionPoint", back_populates="prediction", cascade="all, delete-orphan")

class PredictionPoint(Base):
    __tablename__ = "prediction_points"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    prediction_id = Column(String(36), ForeignKey("predictions.id", ondelete="CASCADE"), nullable=False)
    timestamp = Column(String(50), nullable=False)
    predicted_value = Column(Float, nullable=False)
    lower_bound = Column(Float, nullable=False)
    upper_bound = Column(Float, nullable=False)
    
    prediction = relationship("Prediction", back_populates="points")
