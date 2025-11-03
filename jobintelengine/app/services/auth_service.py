from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.orm import Session
from app.models.models import User, Plan
from app.core.config import settings
from fastapi import HTTPException

def verify_google_token_and_get_user(db: Session, token: str) -> User:
    try:
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), settings.GOOGLE_CLIENT_ID
        )

        google_id = idinfo["sub"]
        email = idinfo.get("email")
        name = idinfo.get("name")
        picture = idinfo.get("picture")

        if not email:
            raise HTTPException(status_code=400, detail="Google token missing email")

        user = db.query(User).filter(User.google_id == google_id).first()
        if not user:
            # Check if user exists by email (if they registered somehow else, though we only use Google)
            user = db.query(User).filter(User.email == email).first()
            if user:
                user.google_id = google_id
            else:
                # Assign free plan by default
                free_plan = db.query(Plan).filter(Plan.name == "Free").first()
                user = User(
                    google_id=google_id,
                    email=email,
                    name=name,
                    avatar_url=picture,
                    plan_id=free_plan.id if free_plan else None
                )
                db.add(user)
            db.commit()
            db.refresh(user)
        
        return user

    except ValueError:
        # Invalid token
        raise HTTPException(status_code=401, detail="Invalid Google token")
