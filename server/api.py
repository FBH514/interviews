import functools
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response
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
    """
    Project constants
    """
    NAME: str = "interview"
    VERSION: int = "v1"
    CACHE: int = 60 ** 2 * 24 * 7


def cache(seconds: int) -> callable:
    """"""

    def decorator(func: callable) -> callable:
        """"""

        @functools.wraps(func)
        def wrapper(*args, **kwargs) -> callable:
            """"""
            response = args[0]
            response.headers['Cache-Control'] = "public, max-age={}".format(seconds)
            return func(*args, **kwargs)

        return wrapper

    return decorator


# GET http://localhost:8001/
@cache(Project.CACHE)
@app.get("/")
async def root() -> str:
    """
    Defines the API root
    GET http://localhost:8001/

    Find out about the currently available topics
    GET http://localhost:8001/interview/v1/content/topics

    Target your preferred topic from the current list of topics
    GET http://localhost:8001/interview/v1/content/topics/{language}

    """
    return """
    Find out about the currently available topics
    GET http://localhost:8001/interview/v1/content/topics

    Target your preferred topic from the current list of topics
    GET http://localhost:8001/interview/v1/content/topics/{language}
    """


# GET http://localhost:8001/interview/v1/content/topics
@cache(Project.CACHE)
@app.get(f"/{Project.NAME}/{Project.VERSION}/content/topics")
async def topics(response: Response) -> list[str]:
    """
    Find out about the currently available topics
    GET http://localhost:8001/interview/v1/content/topics
    :param response: Response
    :return: list[str]
    """
    with Database(os.getenv("DB_NAME")) as db:
        data = []
        for row in db.execute(os.getenv("TOPICS")):
            data.append(row[1])
        return data


# GET http://localhost:8001/interview/v1/content/topics/{language}
@cache(Project.CACHE)
@app.get("/interview/v1/content/topics/{language}")
async def content(response: Response, language: str) -> list:
    """
    Target your preferred topic from the current list of topics
    :param response: Response
    :param language: str
    :return: list
    """
    data = []
    with Database(os.getenv("DB_NAME")) as db:
        if language.lower() not in [row[1].lower() for row in db.execute(os.getenv("TOPICS"))]:
            return [{"question": "Make a selection.", "answer": "Topics are available in the top left menu."}]
        for row in db.execute(f"{os.getenv('ALL')}{language}"):
            data.append({
                'question': row[1],
                'answer': row[2]
            })
        return data


# GET http://localhost:8001/interview/v1/hotkeys
@cache(Project.CACHE)
@app.get(f"/{Project.NAME}/{Project.VERSION}/hotkeys")
async def hotkeys(response: Response) -> list:
    """"""
    with Database(os.getenv("DB_NAME")) as db:
        return [row[1] for row in db.execute(os.getenv("HOTKEYS"))]
