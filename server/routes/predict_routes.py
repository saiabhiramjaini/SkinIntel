from flask import Blueprint
from controllers.predict_controller import predict

predict_routes = Blueprint("predict_routes", __name__)

# Define the /predict route
predict_routes.route("/predict", methods=["POST"])(predict)