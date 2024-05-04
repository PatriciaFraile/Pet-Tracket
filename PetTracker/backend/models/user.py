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