from typing import Annotated
from fastapi import APIRouter, Depends
from app.services.user_service import UserService
from app.schema.user import UserCreate
from app.core.security import verify_token

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("")
def create_user(
    user: UserCreate,
    user_service: Annotated[UserService, Depends(UserService)],
    token_data=Depends(verify_token),
):
    print(token_data)
    return user_service.create_user(user)


@router.get("")
def list_users(user_service: Annotated[UserService, Depends(UserService)]):
    return user_service.list_user()


@router.get("/{user_id}")
def get_user(user_id: str, user_service: Annotated[UserService, Depends(UserService)]):
    return user_service.get_user(user_id)


@router.delete("/{user_id}")
def delet_user(
    user_id: str, user_service: Annotated[UserService, Depends(UserService)]
):
    return user_service.delete_user(user_id)
