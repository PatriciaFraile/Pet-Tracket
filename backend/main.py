from routes import user 
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import PlainTextResponse
from fastapi import FastAPI

app = FastAPI(docs_url="/items/docs", redoc_url=None,openapi_url="/items/openapi.json")
app.include_router(user.user)

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request,exc):
    print(f"{repr(exc)}")
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)