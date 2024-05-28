from typing import Optional
from pydantic import BaseModel , EmailStr
import uuid
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    id: Optional[str] = None
    username: str
    name: str
    email: EmailStr
    password: str

    def __init__(self, **data):
        super().__init__(**data)
        if not self.id:
            self.id = str(uuid.uuid4())
               
class UserLogin(BaseModel):
    username:str
    password: str

class UserCreate(BaseModel):
    username: str
    name: str
    email: EmailStr
    password: str

