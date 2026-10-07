import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.db.session import SessionLocal, engine, Base
from app.models.user import User, UserPreference
from app.models.dataset import Dataset, DatasetFile
from app.models.climate import Location, ClimateObservation
from app.models.model import ModelRegistry
from app.models.training import TrainingJob
from app.models.anomaly import Anomaly, RiskEvent
from app.models.system import SystemEvent
from app.core.security import get_password_hash

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # 1. Users
        if not db.query(User).filter(User.email == "admin@climora.ai").first():
            admin_user = User(
                email="admin@climora.ai",
                password_hash=get_password_hash("Admin123!"),
                full_name="CLIMORA Administrator",
                role="admin"
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
            db.add(UserPreference(user_id=admin_user.id))
            
            analyst_user = User(
                email="analyst@climora.ai",
                password_hash=get_password_hash("Analyst123!"),
                full_name="Climate Lead Analyst",
                role="analyst"
            )
            db.add(analyst_user)
            db.commit()
            db.refresh(analyst_user)
            db.add(UserPreference(user_id=analyst_user.id))
            print("Users seeded.")

        # 2. Datasets
        if db.query(Dataset).count() == 0:
            ds1 = Dataset(
                name="Climate Historical",
                description="Multi-variable climate observations from 1980 to 2023",
                source="ERA5 / ECMWF",
                dataset_type="Multi-Variable",
                format="Parquet",
                variables=["Temperature", "Precipitation", "CO2", "Humidity"],
                spatial_resolution="0.25° x 0.25°",
                temporal_resolution="Hourly",
                start_date="1980",
                end_date="2023",
                record_count="142,500,000",
                size_bytes="1.2 TB",
                status="Available"
            )
            ds2 = Dataset(
                name="Satellite Data",
                description="High resolution remote sensing data from Sentinel-2 and Landsat",
                source="ESA Sentinel / USGS",
                dataset_type="Remote Sensing",
                format="GeoTIFF",
                variables=["NDVI", "Surface Temp", "Cloud Cover"],
                spatial_resolution="10m x 10m",
                temporal_resolution="Daily",
                start_date="2000",
                end_date="2024",
                record_count="89,200,000",
                size_bytes="850 GB",
                status="Available"
            )
            db.add(ds1)
            db.add(ds2)
            db.commit()
            print("Datasets seeded.")

        # 3. Model Registry
        if db.query(ModelRegistry).count() == 0:
            m1 = ModelRegistry(
                name="XGBoost (Ensemble)",
                algorithm="Gradient Boosting Trees",
                variable="Temperature Prediction",
                version="v2.4.1",
                status="Operational",
                accuracy=91.0,
                precision=86.0,
                recall=89.0,
                latency_ms=12.4
            )
            m2 = ModelRegistry(
                name="LightGBM",
                algorithm="Light Gradient Boosting",
                variable="Rainfall Prediction",
                version="v1.8.0",
                status="Operational",
                accuracy=75.0,
                precision=72.0,
                recall=76.0,
                latency_ms=8.5
            )
            db.add(m1)
            db.add(m2)
            db.commit()
            print("Models seeded.")

        print("Database seeding completed successfully.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
