from fastapi import APIRouter,HTTPException
from models.user import User , UserLogin, UserCreate , UpdateUserPassword,UpdateUserUserName
from controller.crud import (hash_password , get_user_by_username,verify_password,create_user, create_mascot, 
                             get_user_by_id , get_user,update_mascot,get_mascot,delete_mascot,get_one_mascot,delete_user,
                               get_user_by_email, prox_vaccine,update_password , update_username)
from models.mascot import CreateMascot,Mascot,UpdateMascotModel,VaccinationModel

user = APIRouter()

@user.post("/register")
async def register(user: UserCreate):
    existing_username = await get_user_by_username(user.username)
    existing_email = await get_user_by_email(user.email)
    if existing_username or existing_email:
        raise HTTPException(status_code=400, detail="Already registered")
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
    new_mascot = Mascot(type=mascot.type , name = mascot.name, breed = mascot.breed,
                         year = mascot.year,weight = mascot.weight, sex = mascot.sex ,vaccine = mascot.vaccine)
    mascot_id = await create_mascot(user_id,new_mascot)
    return{"message":"Mascot created successfully","mascot_id":mascot_id}

@user.post("/user/{user_id}")
async def list(user_id:str):
    result = await get_user(user_id)
    return result

@user.put("/user/{user_id}/mascot/{mascot_id}")
async def update_mascots(user_id: str, mascot_id: str, mascot: UpdateMascotModel):
    try:
        result = await update_mascot(user_id, mascot_id, mascot)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@user.get("/user/{id}/mascots")
async def get_mascots(id: str, sort_by: str = "edad"):
    mascots = await get_mascot(id)
    try:
        sorted_mascots = sorted(mascots, key=lambda x: x.get(sort_by, 0))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid sort key")

    return sorted_mascots 
    
@user.delete("/user/{user_id}/mascot/{mascot_id}")
async def delete_mascot_route(user_id:str,mascot_id:str):
    try:
        result= await delete_mascot(user_id,mascot_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400 , detail= str(e))
    
@user.get("/user/{user_id}/mascot/{mascot_id}")
async def read_mascot(user_id: str, mascot_id: str):
    return await get_one_mascot(user_id, mascot_id)

@user.delete("/user/{user_id}")
async def delete_user_endpoint(user_id: str):
    return await delete_user(user_id)

@user.put("/user/{user_id}/mascot/{mascot_id}/vaccine")
async def update_mascot_vaccine(user_id: str, mascot_id: str, new_vaccine: VaccinationModel):
    try:
        vaccination = VaccinationModel(name=new_vaccine.name, date=new_vaccine.date)
        response = await prox_vaccine(user_id, mascot_id, vaccination)
        if "error" in response:
            raise HTTPException(status_code=400, detail=response["error"])
        return response
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@user.put("/update_password/{user_id}")
async def update_password_route(user_id: str, update_password: UpdateUserPassword):
    return await update_password(user_id, update_password)

@user.put("/update_username/{user_id}")
async def update_username_route(user_id: str, update_username: UpdateUserUserName):
    return await update_username(user_id, update_username) 