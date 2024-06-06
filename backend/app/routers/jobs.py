from fastapi import APIRouter

router = APIRouter()

@router.get("/jobs")
def read_jobs(skip: int = 0):
    return "Hello world"

@router.get("/jobs/{job_id}")
def read_job(job_id: int ):
    return "Hello world"

@router.post("/jobs" )
def create_job():
    return "Hello world"

@router.put("/jobs/{job_id}")
def update_job(job_id: int):
    return "Hello world"

@router.delete("/jobs/{job_id}")
def delete_job(job_id: int):
    return "Hello world"
