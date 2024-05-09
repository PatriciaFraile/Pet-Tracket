from fastapi import APIRouter
from config.database import mongo
from schemas.user import userEntity,usersEntity
from models.user import User
from config.database import collection_name

user = APIRouter()

@user.get('/users')
def find_all():
    return usersEntity(collection_name.find())

@user.get('/users')
def find_all():
    return usersEntity(collection_name.find())

@user.post('/add_user')
def create_user(user:User):
    try:
        new_user  = dict(user)
        new_user["password"] = sha256_crypt.encrypt(new_user["password"])
        id=collection_name.insert_one(new_user).inserted_id
        return {"message": "Accept"}
    except Exception as e:
        raise HTTPException(status_code=500 , detail="Error")
 
@user.get('/user/{id}')
def find_user(id:str):
    return userEntity(collection_name.find_one({"_id":ObjectId(id)}))