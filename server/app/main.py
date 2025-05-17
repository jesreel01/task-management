
from fastapi import FastAPI
from app.core.config import get_settings

from app.api.v1.routes import router as v1_routers





app = FastAPI(title=get_settings().app_name)

app.include_router(v1_routers, prefix="/api/v1")
