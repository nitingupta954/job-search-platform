from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.deps import get_db, get_current_user
from app.models.models import User, Plan
from app.services.payment_service import create_subscription_order, verify_payment_signature, handle_razorpay_webhook

router = APIRouter()

class OrderRequest(BaseModel):
    plan_id: int

class VerifyRequest(BaseModel):
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str

@router.post("/create-order")
def create_order(request: OrderRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_subscription_order(db, current_user, request.plan_id)

@router.post("/verify")
def verify_payment(request: VerifyRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return verify_payment_signature(
        db, current_user, request.razorpay_payment_id, request.razorpay_order_id, request.razorpay_signature
    )

@router.post("/webhook")
async def razorpay_webhook(request: Request, db: Session = Depends(get_db)):
    payload_body = await request.body()
    signature = request.headers.get("x-razorpay-signature", "")
    return handle_razorpay_webhook(payload_body, signature, db)

@router.get("/plans")
def get_plans(db: Session = Depends(get_db)):
    plans = db.query(Plan).all()
    return plans
