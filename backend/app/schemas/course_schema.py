from pydantic import BaseModel


class BaseCourse(BaseModel):
    title: str
    price: int
    description: str | None
    prerequisites: str | None
    student_count: int = 0
    session_count: int
    duration_hours: int
    instructor_id: int | None = None


class GetCourse(BaseCourse):
    id: int


class CreateCourse(BaseCourse):
    pass


class UpdateCourse(BaseCourse):
    id: int
    instructor_id: int | None
    title: str | None
    price: int | None
    description: str | None
    prerequisites: str | None
    student_count: int | None
    session_count: int | None
    duration_hours: int | None