from fastapi import FastAPI
from .routers import jobs

app = FastAPI()

app.include_router(jobs.router)

@app.get("/")
def read_root():
    return {"Job Management backend"}
