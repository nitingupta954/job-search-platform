from app.core.database import SessionLocal
from app.models.models import Plan

def seed_plans():
    db = SessionLocal()
    plans = [
        Plan(name="Free", monthly_search_limit=20, price_inr=0.0),
        Plan(name="Pro", monthly_search_limit=200, price_inr=999.0),
        Plan(name="Unlimited", monthly_search_limit=100000, price_inr=2999.0)
    ]
    for plan in plans:
        existing = db.query(Plan).filter(Plan.name == plan.name).first()
        if not existing:
            db.add(plan)
    db.commit()
    db.close()
    print("Seeded plans.")

if __name__ == "__main__":
    seed_plans()
