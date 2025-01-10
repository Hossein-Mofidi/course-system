from sqlmodel import create_engine, SQLModel

DATABASE_URL = "postgresql://user:password@localhost/mydb"

connect_args = {"check_same_thread": False}
engine = create_engine(DATABASE_URL, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)