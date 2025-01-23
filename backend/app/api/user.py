from typing import Annotated

from fastapi import APIRouter, Depends, Form
from fastapi.security import OAuth2PasswordRequestFormStrict

from crud import user as user_crud
from crud.user import login_with_token, get_current_active_user, check_user_admin
from dependencies import SessionDep
from models.user_model import User
from schemas.user_schema import CreateUser, Token, BaseUser, UpdateUser, CheckAdmin

router = APIRouter()


@router.get("/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@router.get("/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]


@router.get("/check-admin", response_model=CheckAdmin)
async def check_admin(is_admin: Annotated[CheckAdmin, Depends(check_user_admin)]):
    """Check if the user is admin or not"""
    return is_admin


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