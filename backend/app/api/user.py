from typing import Annotated

from fastapi import APIRouter, Depends, Form
from fastapi.security import OAuth2PasswordRequestFormStrict

from crud import user as user_crud
from crud.user import login_with_token
from dependencies import SessionDep
from schemas.user_schema import CreateUser, Token, BaseUser, UpdateUser

router = APIRouter()


@router.post("/create", response_model=BaseUser)
async def create_user(user: Annotated[CreateUser, Form()], session: SessionDep):
    """Create a user with these fields:
       ________________________________
       - **username**
       - **password**

       Return Fields if create is successfull:
       --------------------------------------
       - **username**

       _Tip_ : You should send it via form
    """
    return await user_crud.create_user(user, session)


@router.post("/token")
async def login(
        form_data: Annotated[OAuth2PasswordRequestFormStrict, Depends()],
        session: SessionDep) -> Token:
    """Send a token to a user to loign to the site with jwt
       ====================================================

       you should send these fields via form:
       ______________________________________
       - **grant_type** = password
       - **username**
       - **password**
    """
    return await login_with_token(form_data, session)


@router.patch("/update",
              response_model_exclude=["password"],
              response_model_exclude_none=True)
async def update_user(user: Annotated[UpdateUser, Form()], session: SessionDep) -> UpdateUser:
    """You can send field as long as you want but send it via form please"""
    return user_crud.update_user(user, session)
