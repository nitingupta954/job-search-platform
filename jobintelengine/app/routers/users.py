from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.deps import get_db, get_current_user
from app.models.models import User
from app.services.usage_service import get_current_usage

router = APIRouter()

@router.get("/me/usage")
def get_usage(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_current_usage(db, current_user)
