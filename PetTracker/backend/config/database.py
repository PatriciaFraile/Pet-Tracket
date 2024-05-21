from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import random
import string


mongo = AsyncIOMotorClient("mongodb+srv://laaariizooss:87889123PATRI45rw@cluster0.gqsx385.mongodb.net/")
db = mongo.PetTracker 
collection_name = db.get_collection("users")

