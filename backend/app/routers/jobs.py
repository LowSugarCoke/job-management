from fastapi import APIRouter, HTTPException
from app.controllers import jobs_controller

router = APIRouter()

@router.get("/jobs")
def read_jobs(skip: int = 0):
    raise HTTPException(status_code=400, detail="Invalid request")

@router.get("/jobs/{job_id}")
def read_job(job_id: int ):
    raise HTTPException(status_code=400, detail="Invalid request")

@router.post("/jobs" )
def create_job():
    raise HTTPException(status_code=400, detail="Invalid request")

@router.put("/jobs/{job_id}")
def update_job(job_id: int):
    raise HTTPException(status_code=400, detail="Invalid request")

@router.delete("/jobs/{job_id}")
def delete_job(job_id: int):
    raise HTTPException(status_code=400, detail="Invalid request")
