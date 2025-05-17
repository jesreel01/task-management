from app.model.user import User


class UserRepository:
    def create(self, user: User) -> User:
        pass

    def get_all(self) -> list[User]:
        pass

    def get_by_id(self, user_id: int) -> User:
        pass

    def update(self, user_id: int) -> User:
        pass

    def delete(self, user_id: int):
        pass