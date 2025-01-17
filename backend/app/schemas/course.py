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