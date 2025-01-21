import datetime
from datetime import timedelta

import jwt
from email_validator import validate_email, EmailNotValidError
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestFormStrict
from passlib.context import CryptContext
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session

from dependencies import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from models import user_model as user_model
from models.user_model import User
from schemas.user_schema import CreateUser, Token, UpdateUser

### Verify password ###
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """if verify the user password return true"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


### Create new user ###
async def create_user(user: CreateUser, session: Session) -> User:
    try:
        user.password = get_password_hash(user.password)
        return user_model.create(user, session)
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Username already exists"
        )
    except ValidationError as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail=str(e)
        )


### Update User ###
def update_user(user: UpdateUser, session: Session) -> UpdateUser:
    """Validate email address and save it in the database"""
    # check if email is valid
    if user.email is not None:
        try:
            email_info = validate_email(user.email, check_deliverability=True)
            user.email = email_info.normalized
        except EmailNotValidError:
            raise HTTPException(
                status_code=status.HTTP_406_NOT_ACCEPTABLE,
                detail="Invalid email"
            )

    return user_model.update(user, session)


### Login and Authenticate user ###
def authenticate_user(username: str, password: str, session: Session) -> bool:
    """if authenticate the user return true"""
    user: User = user_model.get(username, session)

    if user is None:
        return False
    if not verify_password(password, user.password):
        return False
    return True


def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.datetime.now() + timedelta(expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt


async def login_with_token(form_data: OAuth2PasswordRequestFormStrict, session: Session) -> Token:
    authenticate = authenticate_user(form_data.username, form_data.password, session)
    if not authenticate:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW_authenticate": "Bearer"}
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(access_token=access_token, token_type="Bearer")
