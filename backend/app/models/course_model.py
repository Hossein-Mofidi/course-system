from pathlib import Path

from sqlalchemy.orm import Session
from sqlmodel import SQLModel, Field

class Course(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True, default=None)
    title: str = Field(nullable=False)
    instructor_id: int = Field(foreign_key="user.id")
    price: int = Field(nullable=False, ge=0)
    description: str | None = None
    prerequisites: str | None
    student_count: int = Field(default=0, ge=0)
    session_count: int = Field(default=0, ge=0)
    duration_hours: int = Field(default=0, ge=0)
    image_path: Path | None = None
    video_path: Path = Field(nullable=False)


def save(course, session: Session):
    session.add(course)
    session.commit()
    session.refresh(course)
    return course