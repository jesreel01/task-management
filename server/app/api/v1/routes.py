from fastapi import APIRouter
from app.api.v1.endpoints.user import router as user_router

router = APIRouter()

router_list : list[APIRouter] = [user_router]

for router_item in router_list:
    router_item.tags = router.tags.append("v1")
    router.include_router(router_item)