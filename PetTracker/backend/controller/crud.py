from pymongo.errors import DuplicateKeyError
from models.user import User
from models.mascot import Mascot
from config.database import collection_name
from bcrypt import hashpw, gensalt, checkpw
import uuid
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



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

async def get_user_by_id(id: str):
    return await collection_name.find_one({"id": id})

async def create_mascot(user_id, mascot: Mascot):
    try:
        mascot_id = str(uuid.uuid4()) 
        result = await collection_name.find_one({"id": user_id})
        updated_mascots = result.get("mascots", [])
        mascot_data = mascot.dict()
        mascot_data["id"] = mascot_id  
        updated_mascots.append(mascot_data)
        await collection_name.update_one({"id": user_id}, {"$set": {"mascots": updated_mascots}})
        return mascot_id
    except Exception as e:
        print(f"Mascot could not be created {e}")




