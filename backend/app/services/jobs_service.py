"""
Jobs Service: This module provides CRUD operations for Job models using SQLAlchemy.

Author: Jack Lee
Date: 2024-06-06
"""

from typing import List
from sqlalchemy.orm import Session
from app.models.job import Job as JobModel

def get_jobs(skip: int = 0, limit: int = 10, db: Session = None) -> List[JobModel]:
    total_jobs = db.query(JobModel).count()
    if skip < 0:
        skip = 0
    if limit < 1:
        limit = 1
    if skip >= total_jobs:
        return [] 
    if skip + limit > total_jobs:
        limit = total_jobs - skip 

    return db.query(JobModel).offset(skip).limit(limit).all()

def get_job(job_id: int, db: Session) -> JobModel:
    return db.query(JobModel).filter(JobModel.id == job_id).first()

def create_job(job: JobModel, db: Session) -> JobModel:
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

def update_job(existing_job: JobModel, updated_job: JobModel, db: Session) -> JobModel:
    for key, value in updated_job.__dict__.items():
        if key != "_sa_instance_state":
            setattr(existing_job, key, value)
    db.commit()
    db.refresh(existing_job)
    return existing_job

def delete_job(job_id: int, db: Session) -> JobModel:
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        return None
    db.delete(job)
    db.commit()
    return job
