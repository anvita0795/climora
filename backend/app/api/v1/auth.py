from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.auth import LoginRequest, Token, UserCreate, UserOut
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=Token, summary="User Login")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    return AuthService.authenticate_user(db, login_data)

@router.post("/register", response_model=UserOut, summary="User Registration")
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    return AuthService.create_user(db, user_data)
