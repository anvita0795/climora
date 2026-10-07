from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User, UserPreference
from app.schemas.auth import LoginRequest, UserCreate
from app.core.security import verify_password, get_password_hash, create_access_token

class AuthService:
    @staticmethod
    def authenticate_user(db: Session, login_data: LoginRequest):
        user = db.query(User).filter(User.email == login_data.email).first()
        if not user or not verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        token = create_access_token(user.id)
        return {"access_token": token, "token_type": "bearer"}

    @staticmethod
    def create_user(db: Session, user_data: UserCreate):
        existing = db.query(User).filter(User.email == user_data.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        hashed_pwd = get_password_hash(user_data.password)
        new_user = User(
            email=user_data.email,
            password_hash=hashed_pwd,
            full_name=user_data.full_name,
            role=user_data.role or "analyst"
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Initialize default user preferences
        prefs = UserPreference(user_id=new_user.id)
        db.add(prefs)
        db.commit()

        return new_user
