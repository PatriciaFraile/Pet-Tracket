from pymongo.errors import DuplicateKeyError
from models.user import User , UpdateUserPassword , UpdateUserUserName
from models.mascot import Mascot,UpdateMascotModel,VaccinationModel
from config.database import collection_name
from bcrypt import hashpw, gensalt, checkpw
import uuid
import bcrypt
from fastapi import HTTPException
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import datetime


async def get_user_by_username(username: str):
    user = await collection_name.find_one({"username": username})
    if user:
        user["id"] = str(user["id"])  
    return user
async def get_user_by_email(email: str):
    user = await collection_name.find_one({"email": email})
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

async def delete_mascot(user_id: str, mascot_id: str):
    user = await collection_name.find_one({"id": user_id})
    if user is None:
        raise ValueError("User not found")

    mascots = user.get("mascots", [])
    updated = False

    new_mascots = [m for m in mascots if m["id"] != mascot_id]

    if len(new_mascots) < len(mascots):
        updated = True

    if not updated:
        raise ValueError("Mascot not found")

    await collection_name.update_one({"id": user_id}, {"$set": {"mascots": new_mascots}})
    return {"msg": "Mascot deleted successfully"}


async def prox_vaccine(user_id: str, mascot_id: str, new_vaccine: VaccinationModel):
    try:
        user = await collection_name.find_one({"id": user_id})
        if not user:
            raise ValueError("User not found")

        mascots = user.get("mascots", [])
        updated = False

        for mascot in mascots:
            if mascot["id"] == mascot_id:
                if "vaccine" not in mascot:
                    mascot["vaccine"] = []
                mascot["vaccine"].append(new_vaccine.dict())
                updated = True
                break

        if not updated:
            raise ValueError("Mascot not found")

        await collection_name.update_one({"id": user_id}, {"$set": {"mascots": mascots}})
        return {"message": "Vaccination added successfully"}
    except Exception as e:
        print(f"Vaccination could not be added: {e}")
        return {"error": str(e)}

async def update_vaccines():
    users = await collection_name.find().to_list(length=None)
    today = datetime.datetime.now().date()

    for user in users:
        mascots = user.get("mascots", [])
        updated = False

        for mascot in mascots:
            for vaccination in mascot.get("vaccine", []):
                vaccination_date = datetime.datetime.strptime(vaccination["date"], "%Y-%m-%d").date()
                if vaccination_date == today:
                    vaccination["status"] = "completed"  # Update the status to completed or any other relevant update
                    updated = True

        if updated:
            await collection_name.update_one({"id": user["id"]}, {"$set": {"mascots": mascots}})

# Scheduler setup
scheduler = AsyncIOScheduler()
scheduler.add_job(update_vaccines, 'interval', days=1)
scheduler.start()
async def mascot_exists(user_id: str, mascot_id: str):
    user = await collection_name.find_one({"id": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    for pet in user.get("mascots", []):
        if pet["id"] == mascot_id:
            return pet

    raise HTTPException(status_code=404, detail="Mascot not found")

    
async def get_one_mascot(user_id: str, mascot_id: str):
    pet = await mascot_exists(user_id, mascot_id)
    if pet is None:
        raise ValueError("Pet not found")
    
    data = {
        "type": "",
        "name": "",
        "breed": "",
        "year": "",
        "weight": "",
        "sex": "",
        "vaccine": "",
        "id": ""
    }
    data['type']=pet['type']
    data['name']=pet['name']
    data['breed']=pet['breed']
    data['year']=pet['year']
    data['weight']=pet['weight']
    data['sex']=pet['sex']
    data['vaccine']=pet['vaccine']
    data['id']=pet['id']
    return data

async def delete_user(user_id: str):
    user = await collection_name.find_one({"id": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    delete_result = await collection_name.delete_one({"id": user_id})
    
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"detail": "User deleted successfully"}

async def update_password(user_id: str, update_password: UpdateUserPassword):
    db_user = await collection_name.find_one({"id": user_id})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not bcrypt.checkpw(update_password.old_password.encode('utf-8'), db_user['password'].encode('utf-8')):
        raise HTTPException(status_code=400, detail="Incorrect old password")

    new_hashed_password = bcrypt.hashpw(update_password.new_password.encode('utf-8'), bcrypt.gensalt())
    await collection_name.update_one(
        {"id": user_id},
        {"$set": {"password": new_hashed_password.decode('utf-8')}}
    )
    return {"message": "Password updated successfully"}

async def update_username(user_id: str, update_username: UpdateUserUserName):
    db_user = await collection_name.find_one({"id": user_id})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_user = await collection_name.find_one({"username": update_username.new_username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    await collection_name.update_one(
        {"id": user_id},
        {"$set": {"username": update_username.new_username}}
    )
    return {"message": "Username updated successfully"}