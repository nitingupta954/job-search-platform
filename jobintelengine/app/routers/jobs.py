from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.deps import get_db, get_current_user
from app.models.models import User, SearchLog
from app.services.usage_service import check_and_increment_usage
from app.scrapers.hunt import hunt_for_jobs
from pydantic import BaseModel
from typing import List, Optional
import time

router = APIRouter()

class SearchRequest(BaseModel):
    search_terms: List[str]
    locations: List[str]
    site_names: Optional[List[str]] = None
    results_wanted: Optional[int] = 15
    hours_old: Optional[int] = 72

@router.post("/search")
def search_jobs(request: SearchRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # 1. Check usage
    check_and_increment_usage(db, current_user)
    
    # 2. Scrape
    start_time = time.time()
    try:
        jobs = hunt_for_jobs(
            search_terms=request.search_terms,
            locations=request.locations,
            site_names=request.site_names,
            results_wanted=request.results_wanted,
            hours_old=request.hours_old
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    end_time = time.time()
    
    # 3. Log search
    log_query = f"Terms: {','.join(request.search_terms)} | Locations: {','.join(request.locations)}"
    search_log = SearchLog(
        user_id=current_user.id,
        query=log_query,
        results_count=len(jobs)
    )
    db.add(search_log)
    db.commit()
    
    return {
        "success": True,
        "count": len(jobs),
        "data": jobs,
        "time_taken_seconds": round(end_time - start_time, 2)
    }
