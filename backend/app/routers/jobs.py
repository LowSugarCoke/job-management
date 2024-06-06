from fastapi import APIRouter
from app.controllers import jobs_controller

router = APIRouter()

@router.get("/jobs")
def read_jobs(skip: int = 0):
    return jobs_controller.read_jobs(skip)

@router.get("/jobs/{job_id}")
def read_job(job_id: int ):
    return jobs_controller.read_job(job_id)

@router.post("/jobs" )
def create_job():
    return jobs_controller.create_job(None)

@router.put("/jobs/{job_id}")
def update_job(job_id: int):
    return jobs_controller.update_job(job_id, None)

@router.delete("/jobs/{job_id}")
def delete_job(job_id: int):
     return jobs_controller.delete_job(job_id)
