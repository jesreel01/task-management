import httpx
import time
from typing import Annotated
from functools import lru_cache
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import Settings, get_settings


@lru_cache()
def get_jwks(config: Annotated[Settings, Depends(get_settings)]):
    response = httpx.get(config.cognito.jwks_url)
    response.raise_for_status()

    return response.json()

def verify_token():
    pass


def get_curren_user():
    pass
