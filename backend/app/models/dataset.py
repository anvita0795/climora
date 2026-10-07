import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    source = Column(String(100), nullable=False)
    dataset_type = Column(String(100), nullable=False) # Multi-Variable, Remote Sensing, etc.
    format = Column(String(50), nullable=False) # Parquet, NetCDF4, GeoTIFF
    variables = Column(JSON, nullable=True)
    spatial_resolution = Column(String(100), nullable=True)
    temporal_resolution = Column(String(100), nullable=True)
    start_date = Column(String(50), nullable=True)
    end_date = Column(String(50), nullable=True)
    coverage_geometry = Column(JSON, nullable=True) # GeoJSON representation for bounds
    record_count = Column(String(50), nullable=True)
    size_bytes = Column(String(50), nullable=True)
    storage_path = Column(String(500), nullable=True)
    status = Column(String(50), default="Available") # Available, Processing, Archived
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    files = relationship("DatasetFile", back_populates="dataset", cascade="all, delete-orphan")

class DatasetFile(Base):
    __tablename__ = "dataset_files"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    dataset_id = Column(String(36), ForeignKey("datasets.id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String(255), nullable=False)
    object_key = Column(String(500), nullable=False)
    file_size_bytes = Column(Integer, nullable=False)
    mime_type = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    dataset = relationship("Dataset", back_populates="files")
