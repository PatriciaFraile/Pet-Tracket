from pymongo import MongoClient

mongo = MongoClient("mongodb+srv://laaariizoos:87889123PATRI45rw@cluster0.gqsx385.mongodb.net/")
db = mongo.PetTracker 
collection_name = db["users"]