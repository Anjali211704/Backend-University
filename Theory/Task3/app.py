from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Student(BaseModel):
    name: str
    branch: str
    semester: int


@app.get("/")
def home():
    return {
        "message": "FastAPI is running"
    }


@app.get("/hello")
def hello(name: str = "Guest"):
    return {
        "message": f"Hello {name}"
    }


@app.post("/student")
def create_student(student: Student):
    return {
        "message": "Student data received",
        "student": student
    }