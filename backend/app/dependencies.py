from typing import Annotated

from sqlalchemy_utils import create_database, database_exists
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import create_engine, SQLModel, Session

from models.user_model import create_superuser, User

DATABASE_URL = "postgresql://course:abolHossein3x2498@localhost/course_management"
SECRET_KEY = "19a5a186bfb38e8c61bcda41c73c4e644f74463ed42062534cb9a735e67c5b71"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

engine = create_engine(DATABASE_URL)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]


def create_db_and_tables():
    #create db if not exists
    if not database_exists(DATABASE_URL):
        create_database(DATABASE_URL)
        SQLModel.metadata.create_all(engine)
        create_superuser(next(get_session()))
    else:
        SQLModel.metadata.create_all(engine)
