from typing import Optional
from pydantic import BaseModel
import uuid

class User(BaseModel):
    id: Optional[str] = None
    username: str
    name: str
    email: str
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
    email: str
    password: str

class ResetPasswordRequest(BaseModel):
    email: str

class ResetPasswordConfirm(BaseModel):
    email: str
    code: str
    new_password: str

