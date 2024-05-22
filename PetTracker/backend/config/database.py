from motor.motor_asyncio import AsyncIOMotorClient



mongo = AsyncIOMotorClient("mongodb+srv://<username>:<password>@cluster0.gqsx385.mongodb.net/")
db = mongo.PetTracker 
collection_name = db.get_collection("users")

