from fastapi import APIRouter
from app.api.v1.endpoints.user import router as user_router

router = APIRouter(tags=["v1"])

router_list : list[APIRouter] = [user_router]


for router_item in router_list:
    router.include_router(router_item)