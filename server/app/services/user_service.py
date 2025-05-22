from app.schema.user import UserCreate, UserOut
from sqlalchemy.ext.asyncio import AsyncSession
from app.model.user import User
from sqlalchemy import select

class UserService:
    def __init__(self, db: AsyncSession):
        self.db = db
        
    async def create_user(self, user: UserCreate):
        db_user = User(
            email=user.email,
            is_active=True
        )
        
        self.db.add(db_user)
        
        await self.db.commit()
        await self.db.refresh(db_user)
        
        return db_user

    async def list_user(self, user: dict):
        result = await self.db.execute(select(User))
        users = result.scalars().all()
        return users
    
    async def get_user(self, user_id: int):
        result = await self.db.execute(select(User).filter(User.id == user_id))
        user = result.scalar_one_or_none()
        return user

    async def update_user(self, user_id: int, user_data: dict):
        result = await self.db.execute(select(User).filter(User.id == user_id))
        user = result.scalar_one_or_none()
        
        if user:
            for key, value in user_data.items():
                setattr(user, key, value)
            
            await self.db.commit()
            await self.db.refresh(user)
            
        return user
        
    async def delete_user(self, user_id: int):
        result = await self.db.execute(select(User).filter(User.id == user_id))
        user = result.scalar_one_or_none()
        
        if user:
            await self.db.delete(user)
            await self.db.commit()
            
        return {"message": "User deleted successfully"}