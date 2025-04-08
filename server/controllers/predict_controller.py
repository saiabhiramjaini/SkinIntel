import os
from flask import request, jsonify
from werkzeug.utils import secure_filename
from models.skin_model import predict_skin_disease

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def predict():
    if "file" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Get prediction result
    result = predict_skin_disease(filepath)

    # Remove temp file
    os.remove(filepath)

    return jsonify(result)
