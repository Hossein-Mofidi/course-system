from sqlmodel import Session, select
from fastapi import HTTPException, status

from models.user_model import User
from schemas.course_schema import UpdateCourse, CreateCourse
from models.course_model import Course


def get_all_courses(session: Session) -> list[Course]:
    stmt = select(Course)
    result = session.exec(stmt).all()
    return result


def get_course_by_id(course_id: int, session: Session):
    course = session.get(Course, course_id)
    if not course:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found with this id!')
    return course


def get_course_by_title(course_title: str, session: Session):
    stmt = select(Course).where(Course.title == course_title)
    result = session.exec(stmt).all()
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found with this title!')
    return result


def create_course(course: CreateCourse, session: Session, user_id: int):
    course.instructor_id = user_id
    course_db = Course.model_validate(course)
    session.add(course_db)
    session.commit()
    session.refresh(course_db)
    return course_db


def update_course(course: UpdateCourse, session: Session, user_id: int):
    statement = select(Course).where(Course.id == course.id)
    course_db = session.exec(statement).first()
    if not course_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Course not found")

    course_data = course.model_dump(exclude_unset=True)
    course_db.sqlmodel_update(course_data)
    session.add(course_db)
    session.commit()
    session.refresh(course_db)
    return course_db


def delete_course_by_id(course_id: int, session: Session, current_user: User):
    course = session.get(Course, course_id)
    if not course:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found with this id!')
    session.delete(course)
    session.commit()
    return {'success': True}