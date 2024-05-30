from pymongo.errors import DuplicateKeyError
from models.user import User
from models.mascot import Mascot,UpdateMascotModel
from config.database import collection_name
from bcrypt import hashpw, gensalt, checkpw
import uuid
from fastapi import HTTPException


async def get_user_by_username(username: str):
    user = await collection_name.find_one({"username": username})
    if user:
        user["id"] = str(user["id"])  
    return user

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
    id = await collection_name.find_one({"id": id})
    return id
    

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
            "password":"",
            "mascots":[]
            }
    
    data['id']=result['id']
    data['username']=result['username']
    data['name']=result['name']
    data['email']=result['email']
    data['password']=result['password']
    data['mascots']=result['mascots']
    return data


async def update_mascot(user_id: str, mascot_id: str, mascot: UpdateMascotModel):
    
    user = await collection_name.find_one({"id": user_id})
    if user is None:
        raise ValueError("User not found")

    mascots = user.get("mascots", [])
    updated = False

    for i, m in enumerate(mascots):
        if m["id"] == mascot_id:
            mascots[i].update({k: v for k, v in mascot.dict().items() if v is not None})
            updated = True
            break

    if not updated:
        raise ValueError("Mascot not found")

    await collection_name.update_one({"id": user_id}, {"$set": {"mascots": mascots}})
    return {"msg": "Mascot updated successfully"}

async def get_mascot(id:str):
    user_data = await get_userDB(id)
    if 'mascots' not in user_data:
        raise HTTPException(status_code=404, detail="No pets found for this user")
    return user_data['mascots']



