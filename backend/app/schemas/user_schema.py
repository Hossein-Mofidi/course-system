from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class BaseUser(BaseModel):
    username: str

    def __repr__(self):
        return self.username


class CreateUser(BaseUser):
    password: str


class PublicUser(BaseUser):
    fisrtname: str
    lastname: str
    email: EmailStr


class UpdateUser(BaseUser):
    firstname: str | None = None
    lastname: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    new_password: str | None = None