from fastapi import FastAPI
from routes import user 

app = FastAPI(docs_url="/items/docs", redoc_url=None,openapi_url="/items/openapi.json")

app.include_router(user.user)