from typing import Annotated
from fastapi import APIRouter, Depends
from app.services.user_service import UserService
from app.schema.user import UserCreate

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("")
def create_user(user: UserCreate, user_service: Annotated[UserService, Depends(UserService)]):
    print(user)
    return user_service.create_user(user)


@router.get("")
def list_users(user_service: Annotated[UserService, Depends(UserService)]):
    return user_service.get_user_list()


@router.get("/{user_id}")
def get_user(user_id: str, user_service: Annotated[UserService, Depends(UserService)]):
    return user_service.get_user(id)


@router.delete("/{user_id}")
def delet_user(user_id: str,  user_service: Annotated[UserService, Depends(UserService)]):
    return user_service.delete_user(user_id)
