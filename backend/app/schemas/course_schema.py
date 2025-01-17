from pydantic import BaseModel

class GetCourse(BaseModel):
    title: str
    instructor_id: int
    price: int
    description: str | None
    prerequisites: str | None
    student_count: int
    session_count: int
    duration_hours: int

class UpdateCourse(BaseModel):
    price: int | None
    description: str | None
    prerequisites: str | None 