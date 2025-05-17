from app.schema.user import UserCreate

class UserService:
    def create_user(self, user: UserCreate):
        return 'test'

    def list_user(self):
        return "list user"

    def get_user(self, user_id):
        return "get user"

    def update_user(self, user_id):
        return "update user"

    def delete_user(self, user_id):
        return "delete user"
