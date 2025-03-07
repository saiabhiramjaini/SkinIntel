from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class User:
    def __init__(self, mongo):
        self.users = mongo.db.users  # Reference to MongoDB users collection

    def create_user(self, email, password):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = {"email": email, "password": hashed_password}
        self.users.insert_one(user)

    def find_by_email(self, email):
        return self.users.find_one({"email": email})
