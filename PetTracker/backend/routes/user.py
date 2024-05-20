from fastapi import APIRouter,HTTPException
from config.database import mongo
from models.user import User , UserLogin
from config.database import collection_name
from passlib.hash import sha256_crypt
from config.crud import hash_password , get_user_by_username,verify_password

user = APIRouter()



@user.post('/add_user')
def create_user(user:User):
    try:
        new_user  = dict(user)
        new_user["password"] = hash_password(new_user["password"])
        id=collection_name.insert_one(new_user).inserted_id
        return {"message": "Accept"}
    except Exception as e:
        raise HTTPException(status_code=500 , detail="Error")
 
@user.post("/login")
async def login(user: UserLogin):
    db_user = await get_user_by_username(user.username)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful"}