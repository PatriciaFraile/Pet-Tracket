from pymongo.errors import DuplicateKeyError
from models.user import User
from models.mascot import Mascot
from config.database import collection_name
from bcrypt import hashpw, gensalt, checkpw
import uuid
import json
from fastapi import HTTPException



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
    id=  await collection_name.find_one({"id": id})

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

async def get_userDB(id):
    print(id)
    try:
        result = await collection_name.find_one({"id":id})
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="User not found")
async def get_user(id:str):
    result = await get_userDB(id)
    data = {"id":"",
            "username":"",
            "name":"",
            "email":"",
            "mascots":[]
            }
    
    data['id']=result['id']
    data['username']=result['username']
    data['name']=result['name']
    data['email']=result['email']
    data['mascots']=result['mascots']

    

    return data






