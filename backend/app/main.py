"""
Main: This is the entry point of the Job Management backend application.
It sets up the FastAPI application, includes the jobs router, and initializes the database.

Author: Jack Lee
Date: 2024-06-06
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import jobs
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(jobs.router)

@app.get("/")
def read_root():
    return {"Job Management backend"}
