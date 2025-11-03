import json
import razorpay
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.models import User, Plan, Payment
from app.core.config import settings

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

def create_subscription_order(db: Session, user: User, plan_id: int):
    plan = db.query(Plan).filter(Plan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    amount = int(plan.price_inr * 100) # Razorpay expects paise

    if amount == 0:
        # Free plan
        user.plan_id = plan.id
        db.commit()
        return {"status": "success", "message": "Switched to Free plan"}

    order_data = {
        "amount": amount,
        "currency": "INR",
        "receipt": f"rcpt_{str(user.id)[:8]}_{plan_id}",
        "notes": {
            "user_id": user.id,
            "plan_id": plan.id
        }
    }

    try:
        order = client.order.create(data=order_data)
        return order
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def verify_payment_signature(db: Session, user: User, payment_id: str, order_id: str, signature: str):
    params_dict = {
        'razorpay_order_id': order_id,
        'razorpay_payment_id': payment_id,
        'razorpay_signature': signature
    }
    
    try:
        client.utility.verify_payment_signature(params_dict)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid payment signature")

    # Payment verified, fetch order notes to find plan
    try:
        order = client.order.fetch(order_id)
        plan_id = order['notes']['plan_id']
        
        # Update user's plan
        user.plan_id = int(plan_id)
        
        # Record payment
        payment = Payment(
            user_id=user.id,
            razorpay_payment_id=payment_id,
            amount=order['amount'] / 100.0,
            status="successful"
        )
        db.add(payment)
        db.commit()
        
        return {"status": "success", "message": "Payment verified and plan updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def handle_razorpay_webhook(payload_body: bytes, signature: str, db: Session):
    try:
        # Verify signature using Razorpay utility
        client.utility.verify_webhook_signature(
            payload_body.decode('utf-8'),
            signature,
            settings.RAZORPAY_WEBHOOK_SECRET
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")
    
    payload = json.loads(payload_body)
    event = payload.get("event")
    
    if event == "order.paid":
        order = payload.get("payload", {}).get("order", {}).get("entity", {})
        payment = payload.get("payload", {}).get("payment", {}).get("entity", {})
        
        order_id = order.get("id")
        payment_id = payment.get("id")
        
        if not order_id or not payment_id:
            return {"status": "ignored", "message": "Missing order_id or payment_id"}
            
        # Check idempotency
        existing_payment = db.query(Payment).filter(Payment.razorpay_payment_id == payment_id).first()
        if existing_payment:
            return {"status": "ignored", "message": "Payment already processed"}
            
        notes = order.get("notes", {})
        user_id = notes.get("user_id")
        plan_id = notes.get("plan_id")
        
        if not user_id or not plan_id:
            return {"status": "ignored", "message": "Missing notes inside order"}
            
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.plan_id = int(plan_id)
            new_payment = Payment(
                user_id=user.id,
                razorpay_payment_id=payment_id,
                amount=order.get('amount', 0) / 100.0,
                status="successful"
            )
            db.add(new_payment)
            db.commit()
            return {"status": "success", "message": "Plan upgraded via webhook"}
            
    return {"status": "ignored", "message": f"Event {event} ignored"}
