"""
Job Model: This model represents a job with various details such as customer name, job type, status, appointment date, and technician.
It maps to the 'jobs' table in the database.

Author: Jack Lee
Date: 2024-06-06
"""

from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    customerName = Column(String(255), index=True)      
    jobType = Column(String(255), index=True)       
    status = Column(String(255), index=True)        
    appointmentDate = Column(DateTime)
    technician = Column(String(255), index=True)    
