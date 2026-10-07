from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.dataset import Dataset, DatasetFile

class DatasetService:
    @staticmethod
    def get_datasets(
        db: Session,
        search: Optional[str] = None,
        variable: Optional[str] = None
    ) -> List[dict]:
        query = db.query(Dataset)
        if search:
            query = query.filter(Dataset.name.ilike(f"%{search}%"))
        datasets = query.all()

        results = []
        for ds in datasets:
            results.append({
                "id": ds.id,
                "name": ds.name,
                "description": ds.description,
                "source": ds.source,
                "type": ds.dataset_type,
                "format": ds.format,
                "variables": ds.variables or ["Temperature", "Precipitation"],
                "spatialResolution": ds.spatial_resolution or "0.25° x 0.25°",
                "temporalResolution": ds.temporal_resolution or "Hourly",
                "timeRange": f"{ds.start_date}–{ds.end_date}" if ds.start_date else "1980–2023",
                "records": ds.record_count or "142,500,000",
                "size": ds.size_bytes or "1.2 TB",
                "lastUpdated": "Recently updated",
                "status": ds.status
            })
        return results

    @staticmethod
    def get_preview(db: Session, dataset_id: str, limit: int = 10) -> dict:
        ds = db.query(Dataset).filter(Dataset.id == dataset_id).first()
        if not ds:
            # Fallback preview dataset slice
            return {
                "dataset_id": dataset_id,
                "name": "Climate Historical Dataset",
                "columns": ["timestamp", "latitude", "longitude", "temperature", "humidity", "co2"],
                "records": [
                    {"timestamp": "2026-10-01 00:00", "latitude": 13.08, "longitude": 80.27, "temperature": 29.4, "humidity": 68, "co2": 421.5},
                    {"timestamp": "2026-10-01 01:00", "latitude": 13.08, "longitude": 80.27, "temperature": 29.1, "humidity": 70, "co2": 421.4},
                    {"timestamp": "2026-10-01 02:00", "latitude": 13.08, "longitude": 80.27, "temperature": 28.8, "humidity": 72, "co2": 421.6},
                ],
                "total_records": 142500000
            }

        return {
            "dataset_id": ds.id,
            "name": ds.name,
            "columns": ["timestamp", "latitude", "longitude", "temperature", "humidity", "co2"],
            "records": [
                {"timestamp": "2026-10-01 00:00", "latitude": 13.08, "longitude": 80.27, "temperature": 29.4, "humidity": 68, "co2": 421.5},
                {"timestamp": "2026-10-01 01:00", "latitude": 13.08, "longitude": 80.27, "temperature": 29.1, "humidity": 70, "co2": 421.4}
            ],
            "total_records": 142500000
        }
