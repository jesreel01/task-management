import httpx
from typing import Annotated
from functools import lru_cache
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import Settings, get_settings
from jose import jwt, JWTError

http_bearer = HTTPBearer()

@lru_cache()
def get_jwks(jwks_url: str):
    response = httpx.get(jwks_url)
    response.raise_for_status()

    return response.json()


def verify_token(token: str, config: Settings) -> dict:
    jwks = get_jwks(config.cognito.jwks_url)

    unverified_header = jwt.get_unverified_header(token)

    key = next((k for k in jwks["keys"] if k["kid"] == unverified_header["kid"]), None)

    if not key:
        raise HTTPException(status_code=401, detail="Public key not found.")
    try:
        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=config.cognito.client_id,
            issuer=config.cognito.issuer,
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token.")


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(http_bearer)],
    config: Annotated[Settings, Depends(get_settings)],
) -> dict:
    return verify_token(credentials.credentials, config)
