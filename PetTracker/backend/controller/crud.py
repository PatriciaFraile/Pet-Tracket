from pymongo.errors import DuplicateKeyError
from models.user import User
from config.database import collection_name
from bcrypt import hashpw, gensalt, checkpw
import smtplib
from email.mime.text import MIMEText


async def get_user_by_username(username: str):
    return await collection_name.find_one({"username": username})

async def create_user(user: User):
    try:
        result = await collection_name.insert_one(user.dict())
        return str(result.inserted_id)
    except DuplicateKeyError:
        return None

def hash_password(password: str) -> str:
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
