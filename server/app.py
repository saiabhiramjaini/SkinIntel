from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models.user import bcrypt
from routes.auth_routes import init_auth_routes
from routes.predict_routes import predict_routes

app = Flask(__name__)
app.config.from_object(Config)

mongo = PyMongo(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(init_auth_routes(mongo), url_prefix="/api")
app.register_blueprint(predict_routes, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
