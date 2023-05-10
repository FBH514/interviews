import functools
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response, FileResponse
from starlette.requests import Request
from database import Database
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Project:
    """"""
    NAME: str = "interview"
    VERSION: int = "v1"


def cache(minutes: int) -> callable:
    """"""
    def decorator(func: callable) -> callable:
        """"""
        @functools.wraps(func)
        def wrapper(*args, **kwargs) -> callable:
            """"""
            response = args[0]
            response.headers['Cache-Control'] = "public, max-age={}".format(minutes)
            return func(*args, **kwargs)
        return wrapper
    return decorator


# GET http://localhost:8000/
async def root() -> str:
    """"""
    pass


# GET http://localhost:8000/interview/v1/content
@cache(15)
@app.get(f"/{Project.NAME}/{Project.VERSION}/content")
async def content(response: Response) -> list:
    """"""
    data = []
    with Database(os.getenv("DB_NAME")) as db:
        for row in db.execute(os.getenv("ALL")):
            data.append({
                'question': row[1],
                'answer': row[2]
            })
        return data
