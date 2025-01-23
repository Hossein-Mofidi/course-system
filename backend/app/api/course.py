from typing import Annotated

from fastapi import APIRouter, Form

from crud.user import UserDep
from models.course_model import Course
from schemas.course_schema import GetCourse, UpdateCourse, CreateCourse
from dependencies import SessionDep
from crud import course as course_crud

router = APIRouter()


@router.get('/')
def get_all_courses(session: SessionDep) -> list[Course]:
    return course_crud.get_all_courses(session)


@router.get('/{course_id}')
def get_course_by_id(course_id: int, session: SessionDep) -> GetCourse:
    return course_crud.get_course_by_id(course_id, session)


@router.get('/title/{course_title}')
def get_course_by_title(course_title: str, session: SessionDep) -> list[GetCourse]:
    return course_crud.get_course_by_title(course_title, session)


@router.post('/create')
async def create_course(
        course: Annotated[CreateCourse, Form()],
        session: SessionDep,
        current_user: UserDep) -> GetCourse:
     return course_crud.create_course(course, session, current_user.id)


@router.patch('/update', response_model_exclude=["password"], response_model_exclude_none=True)
async def update_course(
        course: Annotated[UpdateCourse, Form()],
        session: SessionDep,
        current_user: UserDep) -> GetCourse:
    return course_crud.update_course(course, session, current_user.id)


@router.delete('/delete/{course_id}')
async def delete_course_by_id(course_id: int, session: SessionDep, current_user: UserDep):
    return course_crud.delete_course_by_id(course_id, session, current_user)