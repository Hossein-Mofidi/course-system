from typing import Annotated

import jwt
from fastapi import HTTPException, status
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from pydantic import BaseModel
from sqlmodel import create_engine, SQLModel, Session
from models import user_model
from models.user_model import User

DATABASE_URL = "postgresql://course:abolHossein3x2498@localhost/course_management"
SECRET_KEY = "19a5a186bfb38e8c61bcda41c73c4e644f74463ed42062534cb9a735e67c5b71"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

engine = create_engine(DATABASE_URL)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]


class TokenData(BaseModel):
    username: str | None = None


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], session: SessionDep) -> User:
    # create new exception
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception

        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception

    user = user_model.get(token_data.username, session)
    if user is None:
        raise credentials_exception

    return user