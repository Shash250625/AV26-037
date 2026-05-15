import os
import json
import numpy as np
import tensorflow as tf
from .preprocess import preprocess_image

class DiseasePredictor:
    def __init__(self, model_path='model/crop_model.h5', indices_path='model/class_indices.json'):
        self.model_path = model_path
        self.indices_path = indices_path
        self.model = None
        self.class_indices = None
        self.class_names = None
        
        if os.path.exists(model_path):
            self.model = tf.keras.models.load_model(model_path)
            print("Model loaded successfully.")
        else:
            print("Warning: Model file not found. System will run in DEMO mode.")
            # Build a dummy model for demo purposes if needed
            self.model = tf.keras.applications.MobileNetV2(weights='imagenet')
            
        if os.path.exists(indices_path):
            with open(indices_path, 'r') as f:
                self.class_indices = json.load(f)
                # Invert the dictionary: index -> name
                self.class_names = {v: k for k, v in self.class_indices.items()}
        else:
            # Fallback for demo mode
            self.class_names = {i: f"Class {i}" for i in range(1000)}

    def predict(self, image_path):
        """
        Runs prediction on an image.
        """
        processed_img = preprocess_image(image_path)
        img_array = np.expand_dims(processed_img, axis=0)
        
        preds = self.model.predict(img_array)
        top_idx = np.argmax(preds[0])
        confidence = float(preds[0][top_idx])
        
        disease_name = self.class_names.get(top_idx, "Unknown")
        
        # Format the name to be more readable (e.g., "Tomato___Early_blight" -> "Tomato Early Blight")
        readable_name = disease_name.replace('___', ' ').replace('_', ' ')
        
        return readable_name, confidence, top_idx
