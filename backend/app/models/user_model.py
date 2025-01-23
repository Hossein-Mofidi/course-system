import datetime
from enum import Enum

from fastapi import HTTPException, status
from pydantic import EmailStr
from sqlmodel import SQLModel, Field, Session, select

from schemas.user_schema import CreateUser, UpdateUser


class Roles(Enum):
    USER = "user"
    ADMIN = "admin"


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, index=True)
    firstname: str | None = Field(default=None, nullable=True)
    lastname: str | None = Field(default=None, nullable=True)
    email: EmailStr | None = Field(default=None, nullable=True)
    username: str = Field(nullable=False, unique=True, index=True, min_length=5, max_length=25)
    password: str = Field(nullable=False)
    role: Roles = Field(default=Roles.USER)
    crearted_at: datetime.datetime = datetime.datetime.now()
    desabled: bool = Field(default=False)


def create(user: CreateUser, session: Session) -> User:
    user_db = User.model_validate(user)
    return save(user_db, session)


def create_superuser(session: Session):
    superuser: User = User(id=1,
                           username="admin",
                           password='$2b$12$n8FP4SEZ5PzJx3kKS9KMdeddZprjPRcNvp9JvhsUSE1UpLRgBSR8.',
                           role=Roles.ADMIN)
    user_db = User.model_validate(superuser)
    return save(user_db, session)


def update(user: UpdateUser, session: Session) -> UpdateUser:
    statement = select(User).where(User.username == user.username)
    user_db = session.exec(statement).first()
    if not user_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")

    user_data = user.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)
    return save(user_db, session)


def get_via_username(username: str, session: Session) -> User:
    """Get user from database"""
    statement = select(User).where(User.username == username)
    user: User = session.exec(statement).first()
    return user

def get_via_email(email: EmailStr, session: Session) -> User:
    """Get user from database"""
    statement = select(User).where(User.email == email)
    user: User = session.exec(statement).first()
    return user

def save(user, session: Session) -> User:
    """Save user in database"""
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
