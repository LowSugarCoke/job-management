import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)

def test_read_jobs():
    response = client.get("/jobs")
    assert response.status_code == 200
    assert response.json() == [] 

def test_read_job():
    response = client.get("/jobs/1")
    assert response.status_code == 404

def test_create_job():
    new_job = {
        "id": 1,
        "customerName": "John Doe",
        "jobType": "Plumbing",
        "status": "Scheduled",
        "appointmentDate": "2024-06-15T09:00:00Z",
        "technician": "Jane Smith"
    }
    response = client.post("/jobs", json=new_job)
    assert response.status_code == 200
    assert response.json() == new_job

def test_update_job():
    new_job = {
        "id": 1,
        "customerName": "John Doe",
        "jobType": "Plumbing",
        "status": "Scheduled",
        "appointmentDate": "2024-06-15T09:00:00Z",
        "technician": "Jane Smith"
    }
    client.post("/jobs", json=new_job)

    updated_job = {
        "id": 1,
        "customerName": "Updated Customer",
        "jobType": "Plumbing",
        "status": "In Progress",
        "appointmentDate": "2024-06-15T09:00:00Z",
        "technician": "Jane Smith"
    }
    response = client.put("/jobs/1", json=updated_job)
    assert response.status_code == 200
    assert response.json() == updated_job

def test_delete_job():
    new_job = {
        "id": 1,
        "customerName": "John Doe",
        "jobType": "Plumbing",
        "status": "Scheduled",
        "appointmentDate": "2024-06-15T09:00:00Z",
        "technician": "Jane Smith"
    }
    client.post("/jobs", json=new_job)

    response = client.delete("/jobs/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    response = client.get("/jobs/1")
    assert response.status_code == 404