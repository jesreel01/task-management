from typing import Annotated
from fastapi import APIRouter, Depends
from app.services.user_service import UserService
from app.schema.user import UserCreate
from app.core.security import get_current_user
from app.api.deps import get_user_service

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post("")
async def create_user(
    user: UserCreate,
    user_service: Annotated[UserService, Depends(get_user_service)],
):
    return await user_service.create_user(user)


@router.get("")
async def list_users(
    user_service: Annotated[UserService, Depends(get_user_service)],
    curr_user: Annotated[dict, Depends(get_current_user)],
):
    return await user_service.list_user(curr_user)


@router.get("/{user_id}")
async def get_user(user_id: int, user_service: Annotated[UserService, Depends(get_user_service)]):
    return await user_service.get_user(user_id)


@router.delete("/{user_id}")
async def delete_user(
    user_id: int, user_service: Annotated[UserService, Depends(get_user_service)]
):
    return await user_service.delete_user(user_id)
