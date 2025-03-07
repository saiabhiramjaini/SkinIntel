from flask import jsonify
from flask_jwt_extended import create_access_token
from flask_bcrypt import check_password_hash

def register_user(user_model, email, password):
    if user_model.find_by_email(email):
        return jsonify({"message": "User already exists!"}), 400
    
    user_model.create_user(email, password)
    return jsonify({"message": "User registered successfully!"}), 201

def login_user(user_model, email, password):
    user = user_model.find_by_email(email)
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials!"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token}), 200
