from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.auth_controller import register_user, login_user
from models.user import User

auth_bp = Blueprint("auth", __name__)

def init_auth_routes(mongo):
    user_model = User(mongo)

    @auth_bp.route("/signup", methods=["POST"])
    def signup():
        data = request.get_json()
        return register_user(user_model, data["email"], data["password"])

    @auth_bp.route("/signin", methods=["POST"])
    def signin():
        data = request.get_json()
        return login_user(user_model, data["email"], data["password"])
    
    return auth_bp