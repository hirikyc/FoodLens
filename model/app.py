import os

# Disable GPU and TensorRT
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_DISABLE_GPU'] = '1'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Reduce TensorFlow logging

import gradio as gr
import tensorflow as tf
import numpy as np
import cv2
import pickle
from typing import List, Dict, Any, Tuple, Optional
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.models import Model

# Set memory growth for GPU
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
    except RuntimeError as e:
        print(e)

class RestaurantRecommender:
    def __init__(self, vectorizer, place_vectors, places_data):
        self.vectorizer = vectorizer
        self.place_vectors = place_vectors
        self.places_data = places_data
        
    def get_recommendations(self, food_name: str, top_n: int = 5) -> List[Dict[str, Any]]:
        # Transformasi nama makanan menjadi vektor
        food_vector = self.vectorizer.transform([food_name])
        
        # Hitung skor kemiripan
        similarity_scores = cosine_similarity(food_vector, self.place_vectors).flatten()
        
        # Ambil indeks top N
        top_indices = similarity_scores.argsort()[-top_n:][::-1]
        
        # Ambil rekomendasi
        recommendations = []
        for idx in top_indices:
            place = self.places_data.iloc[idx]
            recommendations.append({
                'name': place['name'],
                'cuisine': place['cuisine'],
                'rating': float(place['rating']),
                'similarity_score': float(similarity_scores[idx])
            })
            
        return recommendations

class ModelLoader:
    def __init__(self):
        print("Initializing ModelLoader...")
        self.model = None
        self.food_labels = None
        self.food_origins = None
        self.restaurant_db = None
        self.load_models_and_data()
        
    def load_models_and_data(self):
        try:
            print("Loading model...")
            # Load model dengan custom objects
            custom_objects = {
                'InputLayer': tf.keras.layers.InputLayer,
                'MobileNetV2': MobileNetV2,
                'GlobalAveragePooling2D': GlobalAveragePooling2D,
                'Dense': Dense,
                'Dropout': Dropout
            }
            
            with tf.keras.utils.custom_object_scope(custom_objects):
                self.model = tf.keras.models.load_model('models/model_indonesian_food.h5')
                print("Model loaded successfully")
                
                # Compile model
                self.model.compile(
                    optimizer='adam',
                    loss='sparse_categorical_crossentropy',
                    metrics=['accuracy']
                )
                print("Model compiled successfully")
            
            # Load food labels
            print("Loading food labels...")
            with open('data/food_labels.pkl', 'rb') as f:
                self.food_labels = pickle.load(f)
            print(f"Loaded {len(self.food_labels)} food labels")
            
            # Load food origins
            print("Loading food origins...")
            with open('data/food_origins.pkl', 'rb') as f:
                self.food_origins = pickle.load(f)
            print(f"Loaded {len(self.food_origins)} food origins")
            
            # Load restaurant database
            print("Loading restaurant database...")
            self.restaurant_db = pd.read_csv('data/restaurant_db.csv')
            print(f"Loaded {len(self.restaurant_db)} restaurants")
            
        except Exception as e:
            print(f"Error loading model or data: {str(e)}")
            raise
    
    def preprocess_image(self, image):
        try:
            print("Preprocessing image...")
            # Convert image to RGB if it's not
            if len(image.shape) == 2:  # If grayscale
                image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
            elif image.shape[2] == 4:  # If RGBA
                image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)
            
            # Resize image
            image = cv2.resize(image, (224, 224))
            print(f"Resized image shape: {image.shape}")
            
            # Normalize image
            image = image.astype(np.float32) / 255.0
            print(f"Normalized image range: [{image.min()}, {image.max()}]")
            
            # Add batch dimension
            image = np.expand_dims(image, axis=0)
            print(f"Final image shape: {image.shape}")
            
            return image
        except Exception as e:
            print(f"Error preprocessing image: {str(e)}")
            raise
    
    def predict_food(self, image):
        try:
            print("Starting prediction...")
            # Preprocess image
            processed_image = self.preprocess_image(image)
            
            # Make prediction
            predictions = self.model.predict(processed_image, verbose=0)
            print(f"Raw predictions shape: {predictions.shape}")
            
            # Get predicted class
            predicted_class = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class])
            print(f"Predicted class: {predicted_class}, Confidence: {confidence:.4f}")
            
            # Get food name and origin
            food_name = self.food_labels[predicted_class]
            food_origin = self.food_origins.get(food_name, "Unknown")
            print(f"Food: {food_name}, Origin: {food_origin}")
            
            # Get restaurant recommendations
            recommendations = self.get_restaurant_recommendations(food_name)
            
            return food_name, food_origin, confidence, recommendations
        except Exception as e:
            print(f"Error during prediction: {str(e)}")
            raise
    
    def get_restaurant_recommendations(self, food_name, max_recommendations=3):
        try:
            # Filter restaurants that serve the food
            matching_restaurants = self.restaurant_db[
                self.restaurant_db['features'].str.contains(food_name, case=False, na=False)
            ]
            
            if len(matching_restaurants) == 0:
                return "Tidak ada rekomendasi restoran yang tersedia untuk makanan ini."
            
            # Sort by rating and get top recommendations
            recommendations = matching_restaurants.sort_values('rating', ascending=False).head(max_recommendations)
            
            # Format recommendations
            result = "Rekomendasi Restoran:\n"
            for _, restaurant in recommendations.iterrows():
                result += f"\n• {restaurant['name']}\n"
                result += f"  Lokasi: {restaurant['location']}\n"
                result += f"  Rating: {restaurant['rating']:.1f}/5.0\n"
                result += f"  Masakan: {restaurant['cuisine']}\n"
            
            return result
        except Exception as e:
            print(f"Error getting restaurant recommendations: {str(e)}")
            return "Error getting restaurant recommendations."

def process_image(image):
    try:
        if image is None:
            return "No image provided", "Please upload an image", 0.0
        
        print("Processing image...")
        food_name, food_origin, confidence, recommendations = model_loader.predict_food(image)
        
        # Format output
        result = f"Food: {food_name}\nOrigin: {food_origin}\nConfidence: {confidence:.2%}\n\n{recommendations}"
        return result
    except Exception as e:
        error_msg = f"Error processing image: {str(e)}"
        print(error_msg)
        return error_msg

# Initialize model loader
print("Initializing application...")
model_loader = ModelLoader()

# Create Gradio interface
print("Creating Gradio interface...")
iface = gr.Interface(
    fn=process_image,
    inputs=gr.Image(type="numpy"),
    outputs=gr.Textbox(label="Prediction Result", lines=10),
    title="Indonesian Food Recognition",
    description="Upload an image of Indonesian food to identify it and get restaurant recommendations.",
    examples=None,
    allow_flagging=False
)

# Launch the interface
print("Launching interface...")
if __name__ == "__main__":
    iface.launch(share=True)