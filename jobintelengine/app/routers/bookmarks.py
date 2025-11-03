from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List, Optional
from pydantic import BaseModel
import math

from app.deps import get_db, get_current_user
from app.models.models import User, BookmarkedJob

router = APIRouter()

class BookmarkCreate(BaseModel):
    job_url: str
    title: str
    company: str
    location: Optional[str] = None
    salary: Optional[str] = None
    job_type: Optional[str] = None
    source_site: Optional[str] = None
    tags: Optional[List[str]] = None
    notes: Optional[str] = None

class BookmarkUpdate(BaseModel):
    notes: str

@router.post("")
def add_bookmark(bookmark: BookmarkCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Convert tags list to comma-separated string
    tags_str = ",".join(bookmark.tags) if bookmark.tags else None
    
    new_bookmark = BookmarkedJob(
        user_id=current_user.id,
        job_url=bookmark.job_url,
        title=bookmark.title,
        company=bookmark.company,
        location=bookmark.location,
        salary=bookmark.salary,
        job_type=bookmark.job_type,
        source_site=bookmark.source_site,
        tags=tags_str,
        notes=bookmark.notes
    )
    
    db.add(new_bookmark)
    
    try:
        db.commit()
        db.refresh(new_bookmark)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Job already bookmarked")
        
    return new_bookmark

@router.get("")
def get_bookmarks(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    offset = (page - 1) * limit
    
    # Base query
    query = db.query(BookmarkedJob).filter(BookmarkedJob.user_id == current_user.id)
    
    total = query.count()
    bookmarks = query.order_by(BookmarkedJob.created_at.desc()).offset(offset).limit(limit).all()
    
    # Convert tags string back to list for frontend
    results = []
    for b in bookmarks:
        b_dict = {
            "id": b.id,
            "job_url": b.job_url,
            "job_title": b.title,
            "company": b.company,
            "location": b.location,
            "salary": b.salary,
            "job_type": b.job_type,
            "source_site": b.source_site,
            "tags": b.tags.split(",") if b.tags else [],
            "notes": b.notes,
            "created_at": b.created_at
        }
        results.append(b_dict)
        
    total_pages = math.ceil(total / limit)
    
    return {
        "bookmarks": results,
        "total": total,
        "page": page,
        "totalPages": total_pages
    }

@router.delete("/{bookmark_id}", status_code=204)
def delete_bookmark(bookmark_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    bookmark = db.query(BookmarkedJob).filter(
        BookmarkedJob.id == bookmark_id,
        BookmarkedJob.user_id == current_user.id
    ).first()
    
    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
        
    db.delete(bookmark)
    db.commit()
    return None

@router.patch("/{bookmark_id}")
def update_bookmark_note(bookmark_id: str, update_data: BookmarkUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    bookmark = db.query(BookmarkedJob).filter(
        BookmarkedJob.id == bookmark_id,
        BookmarkedJob.user_id == current_user.id
    ).first()
    
    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
        
    bookmark.notes = update_data.notes
    db.commit()
    db.refresh(bookmark)
    
    return {
        "id": bookmark.id,
        "job_url": bookmark.job_url,
        "job_title": bookmark.title,
        "company": bookmark.company,
        "location": bookmark.location,
        "salary": bookmark.salary,
        "job_type": bookmark.job_type,
        "source_site": bookmark.source_site,
        "tags": bookmark.tags.split(",") if bookmark.tags else [],
        "notes": bookmark.notes,
        "created_at": bookmark.created_at
    }
