
def get_jobs(skip: int = 0, limit: int = 10):
    return "Get all jobs"

def get_job(job_id: int):
    return f"Get {job_id} job"

def create_job(job):
    return "Create job"

def update_job(job_id: int, job):
    return f"Update {job_id} job"

def delete_job(job_id: int):
    return f"Delete {job_id} job"
