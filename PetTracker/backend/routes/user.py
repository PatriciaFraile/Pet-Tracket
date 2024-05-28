from fastapi import APIRouter,HTTPException
from models.user import User , UserLogin, UserCreate,SearchUser
from controller.crud import (hash_password , get_user_by_username,verify_password,create_user, create_mascot, 
                             get_user_by_id , get_user)
from models.mascot import CreateMascot,Mascot

user = APIRouter()

@user.post("/register")
async def register(user: UserCreate):
    existing_user = await get_user_by_username(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = hash_password(user.password)
    new_user = User(name=user.name, username=user.username, email=user.email, password=hashed_password)
    user_id = await create_user(new_user)
    if user_id is None:
        raise HTTPException(status_code=500, detail="User could not be created")
    return {"message": "User created successfully", "user_id": user_id}
 
@user.post("/login")
async def login(user: UserLogin):
    search = await get_user_by_username(user.username)
    if not search:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    if not verify_password(user.password, search["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful", "id": search["id"]}

@user.put("/{user_id}/add_mascot")
async def add_mascot(user_id: str, mascot: CreateMascot):
    print(user_id)
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_mascot = Mascot(type=mascot.type , name = mascot.name, race = mascot.race,
                         year = mascot.year,weight = mascot.weight, sex = mascot.sex ,vaccine = mascot.vaccine)
    mascot_id = await create_mascot(user_id,new_mascot)
    return{"message":"Mascot created successfully","mascot_id":mascot_id}
@user.post("/user/{user_id}")
async def list(user_id:str):
    result = await get_user(user_id)
    return result



    



