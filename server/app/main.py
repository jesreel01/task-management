from fastapi import FastAPI
from app.api.v1.routes import router as v1_routers

app = FastAPI(tile="Task Management Server")

app.include_router(v1_routers, prefix="/api/v1")
