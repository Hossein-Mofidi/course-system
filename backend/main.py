from contextlib import asynccontextmanager

from fastapi import FastAPI

from dependencies import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(root_path="/api/v1", lifespan=lifespan)
