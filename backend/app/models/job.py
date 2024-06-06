from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    customerName = Column(String, index=True)
    jobType = Column(String, index=True)
    status = Column(String, index=True)
    appointmentDate = Column(DateTime)
    technician = Column(String, index=True)
