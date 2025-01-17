from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api import user, course
from dependencies import create_db_and_tables
from settings import CORS


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(root_path="/api/v1", lifespan=lifespan)
app.add_middleware(CORSMiddleware, **CORS)

app.include_router(router=user.router, prefix="/users", tags=["users"])
app.include_router(router=course.router, prefix="/courses", tags=["courses"])
