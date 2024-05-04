from pymongo import MongoClient

mongo = MongoClient("mongodb+srv://<username>:<password>@cluster0.gqsx385.mongodb.net/")
db = mongo.PetTracker 
collection_name = db["users"]