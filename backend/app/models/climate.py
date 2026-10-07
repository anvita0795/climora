import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship
from app.db.session import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False, index=True)
    region = Column(String(255), nullable=True)
    country = Column(String(255), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    observations = relationship("ClimateObservation", back_populates="location_rel")

class ClimateObservation(Base):
    __tablename__ = "climate_observations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    location_id = Column(String(36), ForeignKey("locations.id"), nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, index=True)
    variable = Column(String(100), nullable=False, index=True)
    value = Column(Float, nullable=False)
    unit = Column(String(20), nullable=True)
    source = Column(String(100), nullable=True)
    quality_flag = Column(String(50), default="valid")
    created_at = Column(DateTime, default=datetime.utcnow)

    location_rel = relationship("Location", back_populates="observations")

class ClimateFeature(Base):
    __tablename__ = "climate_features"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    location_id = Column(String(36), ForeignKey("locations.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    feature_name = Column(String(100), nullable=False)
    feature_value = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
