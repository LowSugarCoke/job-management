"""
Job Schemas: This module defines the schemas for Job models.
These schemas are used for data validation and serialization.

Author: Jack Lee
Date: 2024-06-06
"""

from pydantic import BaseModel
from datetime import datetime

class JobBase(BaseModel):
    customerName: str
    jobType: str
    status: str
    appointmentDate: datetime
    technician: str

class JobCreate(JobBase):
    pass

class JobUpdate(JobBase):
    pass

class Job(JobBase):
    id: int

    class Config:
        orm_mode= True
        json_encoders = {
            datetime: lambda v: v.isoformat(timespec='seconds') + 'Z'
        }
