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
from app.services.redis_service import RedisService
from app.utils import DateTimeEncoder, as_datetime
import json

def read_jobs(skip: int = 0, limit: int = 10, db: Session = None, redis: RedisService = None) -> List[JobSchema]:
    try:
        cache_key = f"jobs_{skip}_{limit}"
        cached_jobs = redis.get_value(cache_key)
        if cached_jobs:
            cached_jobs = cached_jobs.decode('utf-8')
            jobs_list = json.loads(cached_jobs, object_hook=as_datetime)
            return [JobSchema.parse_obj(job) for job in jobs_list]

        jobs = jobs_service.get_jobs(skip=skip, limit=limit, db=db)
        job_schemas = [JobSchema.from_orm(job) for job in jobs]
        redis.set_value(cache_key, json.dumps([job.dict() for job in job_schemas], cls=DateTimeEncoder))
        return job_schemas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
def read_job(job_id: int, db: Session, redis: RedisService = None) -> JobSchema:
    try:
        cache_key = f"job_{job_id}"
        cached_job = redis.get_value(cache_key)
        if cached_job:
            cached_job = cached_job.decode('utf-8')
            job_data = json.loads(cached_job, object_hook=as_datetime)
            return JobSchema.parse_obj(job_data)

        job = jobs_service.get_job(job_id, db)
        if job is None:
            raise HTTPException(status_code=404, detail="Job not found")

        redis.set_value(cache_key, job.json(cls=DateTimeEncoder))
        return JobSchema.from_orm(job)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
def create_job(job_create: JobCreate, db: Session, redis: RedisService = None) -> JobSchema:
    try:
        job_model = JobModel(**job_create.dict())
        job = jobs_service.create_job(job_model, db)
        redis.delete_keys_with_pattern("jobs_*")
        return JobSchema.from_orm(job)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_job(job_id: int, job_update: JobUpdate, db: Session, redis: RedisService = None) -> JobSchema:
    try:
        existing_job = jobs_service.get_job(job_id, db)
        if existing_job is None:
            raise HTTPException(status_code=404, detail="Job not found")

        updated_job = JobModel(**job_update.dict())
        job = jobs_service.update_job(existing_job, updated_job, db)
        redis.client.delete(f"job_{job_id}")
        redis.delete_keys_with_pattern("jobs_*")
        return JobSchema.from_orm(job)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_job(job_id: int, db: Session, redis: RedisService = None) -> JobSchema:
    try:
        job = jobs_service.delete_job(job_id, db)
        if job is None:
            raise HTTPException(status_code=404, detail="Job not found")

        redis.client.delete(f"job_{job_id}")
        redis.delete_keys_with_pattern("jobs_*")
        return JobSchema.from_orm(job)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))