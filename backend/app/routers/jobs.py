"""
Job Router: This route provides endpoints for CRUD operations on Job models.
It uses the jobs_controller to handle the business logic and data transformations.

Author: Jack Lee
Date: 2024-06-06
"""

from typing import List
from fastapi import APIRouter, Depends
from app.controllers import jobs_controller
from app.database import get_db
from sqlalchemy.orm import Session
from app.schemas.job import JobCreate, JobUpdate, Job as JobSchema

router = APIRouter()

@router.get("/jobs", response_model=List[JobSchema])
def read_jobs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return jobs_controller.read_jobs(skip=skip, limit=limit, db=db)

@router.get("/jobs/{job_id}", response_model=JobSchema)
def read_job(job_id: int, db: Session = Depends(get_db)):
    return jobs_controller.read_job(job_id, db)

@router.post("/jobs", response_model=JobSchema)
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    return jobs_controller.create_job(job, db)

@router.put("/jobs/{job_id}", response_model=JobSchema)
def update_job(job_id: int, job: JobUpdate, db: Session = Depends(get_db)):
    return jobs_controller.update_job(job_id, job, db)

@router.delete("/jobs/{job_id}", response_model=JobSchema)
def delete_job(job_id: int, db: Session = Depends(get_db)):
    return jobs_controller.delete_job(job_id, db)
