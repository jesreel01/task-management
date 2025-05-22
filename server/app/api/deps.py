from fastapi import Depends
from app.services.user_service import UserService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

async def get_user_service(db: AsyncSession = Depends(get_db)) -> UserService:
    return  UserService(db)