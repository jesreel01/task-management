from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class CognitoSettings(BaseSettings):
    region: str = ""
    user_pool_id: str = ""
    client_id: str = ""
    jwks_cache_timeout: int = 3600


    @property
    def jwks_url(self):
        return f"https://cognito-idp.{self.region}.amazonaws.com/{self.user_pool_id}/.well-known/jwks.json"

    model_config = SettingsConfigDict(env_file=".env",extra="ignore")

    @property
    def issuer(self) -> str:
        """Generate the expected issuer for token validation"""
        return f"https://cognito-idp.{self.region}.amazonaws.com/{self.user_pool_id}"
    
    
class Settings(BaseSettings):
    app_name: str = ""
    cognito: CognitoSettings = CognitoSettings()

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")



@lru_cache
def get_settings():
    return Settings()