from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.auth import UserPreferenceOut

router = APIRouter(prefix="/users", tags=["User Preferences"])

@router.get("/preferences", response_model=UserPreferenceOut, summary="Get Current User Preferences")
def get_user_preferences(db: Session = Depends(get_db)):
    return {
        "default_location": "Chennai, India",
        "default_variable": "Temperature",
        "preferred_units": "metric",
        "default_scenario": "SSP5-8.5",
        "default_dashboard": "overview"
    }
