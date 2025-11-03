import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "JobIntelEngine"
    DATABASE_URL: str = "sqlite:///./jobintel.db"
    
    JWT_SECRET: str = "CHANGEME"
    GOOGLE_CLIENT_ID: str = "CHANGEME"
    GOOGLE_CLIENT_SECRET: str = "CHANGEME"
    
    RAZORPAY_KEY_ID: str = "CHANGEME"
    RAZORPAY_KEY_SECRET: str = "CHANGEME"
    RAZORPAY_WEBHOOK_SECRET: str = "CHANGEME"
    
    FRONTEND_URL: str = "http://localhost:5173"

    class Config:
        env_file = ".env"

settings = Settings()
