import datetime
from datetime import timedelta
from typing import Annotated

import jwt
from email_validator import validate_email, EmailNotValidError
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestFormStrict
from jwt import InvalidTokenError
from passlib.context import CryptContext
from pydantic import ValidationError, BaseModel
from sqlmodel import Session

from dependencies import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, oauth2_scheme, SessionDep
from models import user_model
from models.user_model import User, Roles
from schemas.user_schema import CreateUser, Token, UpdateUser, CheckAdmin

### Verify password ###
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """if verify the user password return true"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


### Create new user ###
async def create_user(user: CreateUser, session: Session) -> User:
    # Check if username or email already exists
    existing_user = user_model.get_via_username(username=user.username, session=session)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Username or email already exists"
        )

    try:
        user.password = get_password_hash(user.password)
        return user_model.create(user, session)
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

    # Check if email already exists
    existing_user = user_model.get_via_email(user.email, session)
    if existing_user and existing_user.id != user.id:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Email already exists"
        )

    return user_model.update(user, session)


### Login and Authenticate user ###
def authenticate_user(username: str, password: str, session: Session) -> User:
    """if authenticate the user return true"""
    user: User = user_model.get_via_username(username, session)

    if user is None:
        return None
    if not verify_password(password, user.password):
        return None
    return User


def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt


async def login_with_token(form_data: OAuth2PasswordRequestFormStrict, session: Session) -> Token:
    authenticate = authenticate_user(form_data.username, form_data.password, session)
    if not authenticate:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW_Authenticate": "Bearer"}
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="Bearer")


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

    user = user_model.get_via_username(token_data.username, session)
    if user is None:
        raise credentials_exception

    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.desabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


UserDep = Annotated[User, Depends(get_current_active_user)]

async def check_user_admin(current_user: UserDep):
    return CheckAdmin(isAdmin=(current_user.role == Roles.ADMIN))