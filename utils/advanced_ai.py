import os
import google.generativeai as genai
from PIL import Image

# Global variables for caching the Moondream model
_MOONDREAM_MODEL = None
_MOONDREAM_TOKENIZER = None

def analyze_with_gemini(image_path, api_key):
    """Analyzes an image using the Gemini API with dynamic model fallback."""
    if not api_key:
        return "Error: Gemini API Key is required for Cloud AI Mode."
    
    try:
        genai.configure(api_key=api_key)
        
        model_names_to_try = [
            'gemini-1.5-flash',
            'gemini-1.5-flash-latest',
            'gemini-1.0-pro-vision-latest',
            'gemini-pro-vision',
            'gemini-1.5-pro'
        ]
        
        img = Image.open(image_path)
        prompt = "You are an expert plant pathologist. Analyze this plant leaf image. If there is a disease, what is it? Provide a short, concise diagnosis of the primary condition and one sentence of advice."
        
        last_error = ""
        for name in model_names_to_try:
            try:
                model = genai.GenerativeModel(name)
                response = model.generate_content([prompt, img])
                return response.text
            except Exception as e:
                last_error = str(e)
                # If the error is about the model not being found, try the next one
                if "404" not in str(e) and "not found" not in str(e).lower():
                    # Stop if it's an auth error or something else
                    break
                    
        return f"Gemini API Error: Could not find a compatible vision model for your API key. Last error: {last_error}"
    except Exception as e:
        return f"Gemini API Error: {str(e)}"

def analyze_with_moondream(image_path):
    """Analyzes an image using the local, offline Moondream2 model."""
    global _MOONDREAM_MODEL, _MOONDREAM_TOKENIZER
    
    try:
        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer
    except ImportError:
        return "Error: transformers and torch are not installed. Cannot run offline mode."

    try:
        if _MOONDREAM_MODEL is None:
            # Load the model only once to save time on subsequent requests
            print("Loading Moondream2 model (this may take a minute on the first run)...")
            model_id = "vikhyatk/moondream2"
            revision = "2024-08-26"
            
            _MOONDREAM_MODEL = AutoModelForCausalLM.from_pretrained(
                model_id, trust_remote_code=True, revision=revision
            )
            # Use eval mode
            _MOONDREAM_MODEL.eval()
            
        img = Image.open(image_path)
        
        # Use Moondream's custom encoding
        enc_image = _MOONDREAM_MODEL.encode_image(img)
        prompt = "What plant disease is visible on this leaf? If it's healthy, just say healthy. Be concise."
        
        # Generate answer
        answer = _MOONDREAM_MODEL.answer_question(enc_image, prompt, _MOONDREAM_TOKENIZER)
        
        return "Offline AI Diagnosis: " + answer
    except Exception as e:
        return f"Offline AI Error: {str(e)}"
