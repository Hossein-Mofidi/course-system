from sqlmodel import Session, select
from fastapi import HTTPException, status
from schemas.course_schema import UpdateCourse
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

def get_course_by_title(course_title: str, session: Session):
    stmt = select(Course).where(Course.title == course_title)
    result = session.exec(stmt).all()
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found with this title!')
    return result

def delete_course_by_id(course_id: int, session: Session):
    course = session.get(Course, course_id)
    if not course:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found with this id!')
    session.delete(course)
    session.commit()
    return {'success': True}

def update_course(course_id: int, new_fields: UpdateCourse, session: Session):
    course = session.get(Course, course_id)
    if not course:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail='no courses found with this id!')
    if new_fields.price:
        course.price = new_fields.price
    if new_fields.description:
        course.description = new_fields.description
    if new_fields.prerequisites:
        course.prerequisites = new_fields.prerequisites
    session.add(course)
    session.commit()
    session.refresh(course)
    return course              

#test create course
# def create_course(session: Session):
#     course = Course(title='test_course', instructor_id=1, price=2000)
#     session.add(course)
#     session.commit()
#     session.refresh(course)
#     return course