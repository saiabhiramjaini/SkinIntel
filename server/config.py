import os

class Config:
    MONGO_URI = "mongodb://localhost:27017/authdb"
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret")