from typing import Optional
from pydantic import BaseModel

class Mascot(BaseModel):
    type: str
    name : str
    race: str
    eat:str
    year:str
    needs:str
    vaccine: str

            
class CreateMascot(BaseModel):
    type: str
    name : str
    race: str
    eat:str
    year:str
    needs:str
    vaccine: str
