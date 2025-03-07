import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "skin_cancer_model.h5")
model = load_model(MODEL_PATH)

# Define class labels
CLASS_NAMES = ["Melanoma", "Nevus", "Basal Cell Carcinoma", "Actinic Keratosis", 
               "Benign Keratosis", "Dermatofibroma", "Vascular Lesion", "Squamous Cell Carcinoma", "Unknown"]

# Function to preprocess an image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))  # Resize
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize
    return img_array

# Function to predict skin disease
def predict_skin_disease(img_path):
    img_array = preprocess_image(img_path)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]
    confidence = float(np.max(predictions))

    return {
        "class": CLASS_NAMES[predicted_class],
        "confidence": confidence
    }
