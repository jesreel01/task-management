from typing import Annotated
from fastapi import APIRouter, Depends
from app.services.user_service import UserService
from app.schema.user import UserCreate
from app.core.security import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post("")
def create_user(
    user: UserCreate,
    user_service: Annotated[UserService, Depends(UserService)],
):
    return user_service.create_user(user)


@router.get("")
async def list_users(
    user_service: Annotated[UserService, Depends(UserService)],
    curr_user: Annotated[dict, Depends(get_current_user)]
):
    print(curr_user.get("sub"))
    return await user_service.list_user()


@router.get("/{user_id}")
def get_user(user_id: str, user_service: Annotated[UserService, Depends(UserService)]):
    return user_service.get_user(user_id)


@router.delete("/{user_id}")
def delet_user(
    user_id: str, user_service: Annotated[UserService, Depends(UserService)]
):
    return user_service.delete_user(user_id)
