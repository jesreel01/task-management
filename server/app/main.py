from functools import lru_cache
from fastapi import FastAPI
from app.core.config import Settings

from app.api.v1.routes import router as v1_routers


@lru_cache
def get_settings():
    return Settings()

app = FastAPI(title=get_settings().app_name)

app.include_router(v1_routers, prefix="/api/v1")
