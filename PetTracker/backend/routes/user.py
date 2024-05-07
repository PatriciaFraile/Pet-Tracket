from fastapi import APIRouter
from config.database import mongo
from schemas.user import userEntity,usersEntity
from models.user import User
from config.database import collection_name

user = APIRouter()

@user.get('/users')
def find_all():
    return usersEntity(collection_name.find())

@user.post('/add_user')
def create_user(user:User):
    new_user  = dict(user)
    id=collection_name.insert_one(new_user).inserted_id
    return str(id)