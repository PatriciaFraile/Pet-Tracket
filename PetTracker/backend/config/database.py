from motor.motor_asyncio import AsyncIOMotorClient
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig




mongo = AsyncIOMotorClient("mongodb+srv://<username>:<password>@cluster0.gqsx385.mongodb.net/")
db = mongo.PetTracker 
collection_name = db.get_collection("users")

conf = ConnectionConfig(
    MAIL_USERNAME = "your_email@example.com",
    MAIL_PASSWORD = "your_password",
    MAIL_FROM = "your_email@example.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "your_mail_server",
    MAIL_TLS = True,
    MAIL_SSL = False
)