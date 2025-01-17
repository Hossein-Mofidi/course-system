from typing import Sequence
from fastapi import APIRouter
from schemas.course import GetCourse
from dependencies import SessionDep
from crud import course as course_crud

router = APIRouter()

@router.get('/')
def get_all_courses(session: SessionDep) -> Sequence[GetCourse]:
    return course_crud.get_all_courses(session)

@router.get('/{course_id}')
def get_course_by_id(course_id: int, session: SessionDep) -> GetCourse:
    return course_crud.get_course_by_id(course_id, session)





#test create course
# @router.post('/')
# def create_course(session: SessionDep) -> GetCourse:
#     return course_crud.create_course(session)