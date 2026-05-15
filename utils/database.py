import os
import json
from datetime import datetime

DATABASE_FILE = 'database/new_discoveries.json'

def init_db():
    if not os.path.exists('database'):
        os.makedirs('database', exist_ok=True)
    if not os.path.exists(DATABASE_FILE):
        with open(DATABASE_FILE, 'w') as f:
            json.dump([], f)

def log_new_disease(image_filename, diagnosis_text):
    init_db()
    
    # Don't log if it's an error message or standard "Healthy" response
    if "Error:" in diagnosis_text or "Healthy" in diagnosis_text or "healthy" in diagnosis_text:
        return
        
    entry = {
        "id": datetime.now().strftime("%Y%m%d%H%M%S"),
        "timestamp": datetime.now().isoformat(),
        "image": image_filename,
        "diagnosis": diagnosis_text
    }
    
    with open(DATABASE_FILE, 'r') as f:
        data = json.load(f)
        
    data.append(entry)
    
    with open(DATABASE_FILE, 'w') as f:
        json.dump(data, f, indent=4)
