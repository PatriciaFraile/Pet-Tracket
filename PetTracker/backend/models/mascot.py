from typing import Optional
from pydantic import BaseModel

class Mascot(BaseModel):
    type: str
    name : str
    breed: str
    year:str
    weight:str
    sex:str
    vaccine: str

            
class CreateMascot(BaseModel):
    type: str
    name : str
    breed: str
    year:str
    weight:str
    sex:str
    vaccine: str
class VaccinationModel(BaseModel):
    name: str
    date: str
class UpdateMascotModel(BaseModel):
    name: Optional[str] = None
    year: Optional[str] = None
    weight:Optional[str] = None
    
