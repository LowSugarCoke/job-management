"""
Jobs Controller: This module provides CRUD operations for Job models.
It converts schema instances to model instances and vice versa.

Author: Jack Lee
Date: 2024-06-06
"""

from typing import List
from sqlalchemy.orm import Session
from app.models.job import Job as JobModel
from fastapi import HTTPException
from app.services import jobs_service
from app.schemas.job import JobCreate, JobUpdate, Job as JobSchema

def read_jobs(skip: int = 0, limit: int =10, db: Session = None) -> List[JobSchema]:
    jobs = jobs_service.get_jobs(skip=skip, limit=limit, db=db)
    return [JobSchema.from_orm(job) for job in jobs]

def read_job(job_id: int, db: Session) -> JobSchema:
    job = jobs_service.get_job(job_id, db)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobSchema.from_orm(job)

def create_job(job_create: JobCreate, db: Session) -> JobSchema:
    job_model = JobModel(**job_create.dict())
    job = jobs_service.create_job(job_model, db)
    return JobSchema.from_orm(job)

def update_job(job_id: int, job_update: JobUpdate, db: Session) -> JobSchema:
    existing_job = jobs_service.get_job(job_id, db)
    if existing_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    updated_job = JobModel(**job_update.dict())
    job = jobs_service.update_job(existing_job, updated_job, db)
    return JobSchema.from_orm(job)

def delete_job(job_id: int, db: Session) -> JobSchema:
    job = jobs_service.delete_job(job_id, db)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobSchema.from_orm(job)
