from typing import Optional
from pydantic import BaseModel

class Mascot(BaseModel):
    type: str
    name : str
    race: str
    year:str
    weight:str
    sex:str
    vaccine: str

            
class CreateMascot(BaseModel):
    type: str
    name : str
    race: str
    year:str
    weight:str
    sex:str
    vaccine: str
    
class UpdateMascotModel(BaseModel):
    name: Optional[str] = None
    year: Optional[str] = None
    weight:str
    vaccine: str