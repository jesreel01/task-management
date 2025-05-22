
from fastapi import FastAPI
from app.core.config import get_settings
from contextlib import asynccontextmanager
from app.core.database import engine,  Base
from app.api.v1.routes import router as v1_routers



@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield

    await engine.dispose()

app = FastAPI(title=get_settings().app_name)


app.include_router(v1_routers, prefix="/api/v1")
