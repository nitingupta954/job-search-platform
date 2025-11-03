from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import User, SearchUsage, Plan

def _get_month_year_str() -> str:
    now = datetime.utcnow()
    return f"{now.year}-{now.month:02d}"

def get_current_usage(db: Session, user: User) -> dict:
    month_year = _get_month_year_str()
    usage = db.query(SearchUsage).filter(
        SearchUsage.user_id == user.id,
        SearchUsage.month_year == month_year
    ).first()

    used = usage.search_count if usage else 0
    limit = user.plan.monthly_search_limit if user.plan else 15
    remaining = max(0, limit - used)

    return {
        "used": used,
        "limit": limit,
        "remaining": remaining,
        "resets_on": "Start of next month"
    }

def check_and_increment_usage(db: Session, user: User):
    month_year = _get_month_year_str()
    usage = db.query(SearchUsage).filter(
        SearchUsage.user_id == user.id,
        SearchUsage.month_year == month_year
    ).first()

    if not usage:
        usage = SearchUsage(user_id=user.id, month_year=month_year, search_count=0)
        db.add(usage)
        db.commit()
        db.refresh(usage)

    limit = user.plan.monthly_search_limit if user.plan else 15

    if usage.search_count >= limit:
        raise HTTPException(
            status_code=402, 
            detail="Search limit reached. Please upgrade your plan."
        )

    usage.search_count += 1
    db.commit()
    db.refresh(usage)
    return usage
