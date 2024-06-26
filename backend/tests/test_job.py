"""
Test Job: This module contains tests for the Job endpoints in the Job Management application.
It tests CRUD operations on the Job model using the FastAPI test client.

Author: Jack Lee
Date: 2024-06-06
"""

def test_read_jobs(client):
    response = client.get("/jobs")
    assert response.status_code == 200 # nosec
    assert response.json() == [] # nosec

def test_read_job(client):
    response = client.get("/jobs/1")
    assert response.status_code == 404 # nosec

def test_create_job(client):
    new_job = {
        "id": 1,
        "customerName": "John Doe",
        "jobType": "Plumbing",
        "status": "Scheduled",
        "appointmentDate": "2024-06-15T09:00:00Z",
        "technician": "Jane Smith"
    }
    response = client.post("/jobs", json=new_job)
    assert response.status_code == 200 # nosec
    assert response.json() == new_job # nosec

def test_update_job(client):
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
    assert response.status_code == 200 # nosec
    assert response.json() == updated_job # nosec

def test_delete_job(client):
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
    assert response.status_code == 200 # nosec
    assert response.json()["id"] == 1 # nosec
    response = client.get("/jobs/1")
    assert response.status_code == 404 # nosec
