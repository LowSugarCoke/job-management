from app.services import job_service

def read_jobs(skip: int = 0):
    return job_service.get_jobs(skip)

def read_job(job_id: int):
    return job_service.get_job(job_id)

def create_job(job):
    return job_service.create_job(job)

def update_job(job_id: int, job):
    return job_service.update_job(job_id, job)

def delete_job(job_id: int):
    return job_service.delete_job(job_id)
