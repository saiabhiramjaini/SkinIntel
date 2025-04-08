# import os
# import numpy as np
# import tensorflow as tf
# import cv2
# from tensorflow.keras.models import load_model

# # Load the trained model
# MODEL_PATH = os.path.join(os.path.dirname(__file__), "skin_cancer_cnn.keras")
# model = load_model(MODEL_PATH, compile=False)

# # Print input shape to confirm correct preprocessing
# print("Model Input Shape:", model.input_shape)

# # Define class labels (updated to match your first code's label_map)
# CLASS_NAMES = {
#     0: "Actinic Keratoses",
#     1: "Basal Cell Carcinoma",
#     2: "Benign keratosis-like Nesions",
#     3: "Dermatofibroma",
#     4: "Melanoma",
#     5: "Melanocytic Nevi",
#     6: "Vascular Lesions"
# }

# # Function to preprocess an image using OpenCV (consistent with first code)
# def preprocess_image(img_path):
#     try:
#         # Read image directly if path is provided
#         if isinstance(img_path, str):
#             img = cv2.imread(img_path)
#         else:
#             # Handle byte input if needed
#             nparr = np.frombuffer(img_path, np.uint8)
#             img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
#         if img is None:
#             print("Failed to load image")
#             return None
        
#         # Use the same size as your first working code (64x64)
#         img = cv2.resize(img, (64, 64))
#         img = img / 255.0  # Normalize
#         img = np.expand_dims(img, axis=0)  # Add batch dimension
#         return img
#     except Exception as e:
#         print(f"Error in preprocessing image: {str(e)}")
#         return None

# # Function to predict skin disease
# def predict_skin_disease(img_path):
#     img_array = preprocess_image(img_path)
#     if img_array is None:
#         return {"error": "Failed to process image"}
    
#     predictions = model.predict(img_array)
    
#     print("Raw predictions:", predictions)  # Debug output
    
#     predicted_class = np.argmax(predictions[0])
#     confidence = float(predictions[0][predicted_class])

#     return {
#         "class": CLASS_NAMES.get(predicted_class, "Unknown"),
#         "confidence": confidence
#     }

import os
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Hugging Face Inference Client
client = InferenceClient(
    api_key=os.getenv("HUGGINGFACE_API_KEY")
)

# Define label mapping with underscore handling
LABEL_DICT = {
    "benign_keratosis-like_lesions": "Benign Keratosis",
    "basal_cell_carcinoma": "Basal Cell Carcinoma",
    "actinic_keratoses": "Actinic Keratoses",
    "vascular_lesions": "Vascular Lesions",
    "melanocytic_Nevi": "Melanocytic Nevi",
    "melanoma": "Melanoma",
    "dermatofibroma": "Dermatofibroma"
}

def predict_skin_disease(image_path):
    """Predict skin disease using Hugging Face model"""
    try:
        output = client.image_classification(
            image_path, 
            model="Anwarkh1/Skin_Cancer-Image_Classification"
        )
        
        # Get the raw label from the model output
        raw_label = output[0].label
        confidence = float(output[0].score)
        
        # Map to readable label using the dictionary
        readable_label = LABEL_DICT.get(raw_label, "Unknown Skin Condition")
        
        return {
            "status": "success",
            "prediction": readable_label,
            "scientific_name": raw_label,  # Original label from model
            "confidence": confidence,
            "confidence_percentage": f"{confidence*100:.2f}%"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
