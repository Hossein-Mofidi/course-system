from sqlmodel import Session, select
from fastapi import HTTPException, status
from models.course_model import Course


def get_all_courses(session: Session):
    stmt = select(Course)
    result = session.exec(stmt).all()
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found!')
    return result


def get_course_by_id(course_id: int, session: Session):
    course = session.get(Course, course_id)
    if not course:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found with this id!')
    return course

#test create course
# def create_course(session: Session):
#     course = Course(title='test_course', instructor_id=1, price=2000)
#     session.add(course)
#     session.commit()
#     session.refresh(course)
#     return course