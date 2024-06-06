from app.services import jobs_service

def read_jobs(skip: int = 0):
    return jobs_service.get_jobs(skip)

def read_job(job_id: int):
    return jobs_service.get_job(job_id)

def create_job(job):
    return jobs_service.create_job(job)

def update_job(job_id: int, job):
    return jobs_service.update_job(job_id, job)

def delete_job(job_id: int):
    return jobs_service.delete_job(job_id)
