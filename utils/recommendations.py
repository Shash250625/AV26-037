def get_recommendation(disease_name, severity_level):
    """
    Returns structured treatment recommendations for a given disease and severity.
    Includes a brief AI Suggestion and a detailed Surveyed Solution.
    """
    # Normalize input for case-insensitive matching
    query_name = disease_name.strip().title()
    
    recommendations = {
        "Tomato Early Blight": {
            "suggestion": "Prune lower foliage and apply Mancozeb fungicide every 7 days.",
            "surveyed_solution": "1. Remove affected leaves immediately. 2. Apply a copper-based fungicide or Mancozeb. 3. Ensure proper spacing for airflow. 4. Avoid overhead watering to keep foliage dry."
        },
        " Early Blight": { # Added to support user's custom naming
            "suggestion": "Prune lower foliage and apply Mancozeb fungicide every 7 days.",
            "surveyed_solution": "1. Remove affected leaves immediately. 2. Apply a copper-based fungicide or Mancozeb. 3. Ensure proper spacing for airflow. 4. Avoid overhead watering to keep foliage dry."
        },
        "Tomato Late Blight": {
            "suggestion": "Immediate Copper-based fungicide application required.",
            "surveyed_solution": "1. Destroy highly infected plants. 2. Apply Ridomil Gold or chlorothalonil. 3. Avoid planting tomatoes near potatoes as they share the pathogen. 4. Clean all gardening tools with a 10% bleach solution."
        },
        " Late Blight": { # Added to support user's custom naming
            "suggestion": "Immediate Copper-based fungicide application required.",
            "surveyed_solution": "1. Destroy highly infected plants. 2. Apply Ridomil Gold or chlorothalonil. 3. Avoid planting tomatoes near potatoes as they share the pathogen. 4. Clean all gardening tools with a 10% bleach solution."
        },
        "Tomato Bacterial Spot": {
            "suggestion": "Use Copper hydroxide mixed with Mancozeb.",
            "surveyed_solution": "1. Stop overhead irrigation to reduce splash spread. 2. Apply a mixture of copper and Mancozeb for effective control. 3. Practice crop rotation (avoid peppers/tomatoes in the same spot for 3 years)."
        },
        " Bacterial Spot": {
            "suggestion": "Use Copper hydroxide mixed with Mancozeb.",
            "surveyed_solution": "1. Stop overhead irrigation to reduce splash spread. 2. Apply a mixture of copper and Mancozeb for effective control. 3. Practice crop rotation (avoid peppers/tomatoes in the same spot for 3 years)."
        },
        "Tomato Leaf Mold": {
            "suggestion": "Increase ventilation and maintain humidity below 80%.",
            "surveyed_solution": "1. Prune the lower canopy to maximize airflow. 2. Use horizontal airflow fans if in a greenhouse. 3. Apply preventative fungicides like chlorothalonil early in the season."
        },
        " Leaf Mold": {
            "suggestion": "Increase ventilation and maintain humidity below 80%.",
            "surveyed_solution": "1. Prune the lower canopy to maximize airflow. 2. Use horizontal airflow fans if in a greenhouse. 3. Apply preventative fungicides like chlorothalonil early in the season."
        },
        "Tomato Septoria Leaf Spot": {
            "suggestion": "Apply Chlorothalonil or Copper fungicides.",
            "surveyed_solution": "1. Remove and destroy infected debris post-harvest. 2. Use mulch to prevent soil-borne spores from splashing onto leaves. 3. Apply organic copper sprays weekly during humid periods."
        },
        " Septoria Leaf Spot": {
            "suggestion": "Apply Chlorothalonil or Copper fungicides.",
            "surveyed_solution": "1. Remove and destroy infected debris post-harvest. 2. Use mulch to prevent soil-borne spores from splashing onto leaves. 3. Apply organic copper sprays weekly during humid periods."
        },
        "Tomato Spider Mites Two Spotted Spider Mite": {
            "suggestion": "Apply Abamectin or Neem oil.",
            "surveyed_solution": "1. Introduce predatory mites (Phytoseiulus persimilis). 2. Spray horticultural oils or insecticidal soaps. 3. Increase humidity as spider mites thrive in dry conditions."
        },
        " Spider Mites Two Spotted Spider Mite": {
            "suggestion": "Apply Abamectin or Neem oil.",
            "surveyed_solution": "1. Introduce predatory mites (Phytoseiulus persimilis). 2. Spray horticultural oils or insecticidal soaps. 3. Increase humidity as spider mites thrive in dry conditions."
        },
        "Tomato Target Spot": {
            "suggestion": "Improve air circulation and apply Boscalid.",
            "surveyed_solution": "1. Apply systemic fungicides early. 2. Ensure adequate nitrogen levels in the soil. 3. Destroy crop residue immediately after harvesting."
        },
        " Target Spot": {
            "suggestion": "Improve air circulation and apply Boscalid.",
            "surveyed_solution": "1. Apply systemic fungicides early. 2. Ensure adequate nitrogen levels in the soil. 3. Destroy crop residue immediately after harvesting."
        },
        "Tomato Yellow Leaf Curl Virus": {
            "suggestion": "Control Whitefly populations using Neem oil.",
            "surveyed_solution": "1. Remove and burn infected plants as there is no cure for the virus. 2. Control the vector (silverleaf whitefly) using insecticidal soap and reflective mulches. 3. Plant resistant varieties next season."
        },
        " Yellow Leaf Curl Virus": {
            "suggestion": "Control Whitefly populations using Neem oil.",
            "surveyed_solution": "1. Remove and burn infected plants as there is no cure for the virus. 2. Control the vector (silverleaf whitefly) using insecticidal soap and reflective mulches. 3. Plant resistant varieties next season."
        },
        "Tomato Mosaic Virus": {
            "suggestion": "Destroy infected plants immediately and sterilize all tools.",
            "surveyed_solution": "1. The virus is highly contagious; remove plants immediately. 2. Sterilize tools with a 10% bleach solution. 3. Wash hands with soap and water after handling infected plants. 4. Do not compost the infected plants."
        },
        " Mosaic Virus": {
            "suggestion": "Destroy infected plants immediately and sterilize all tools.",
            "surveyed_solution": "1. The virus is highly contagious; remove plants immediately. 2. Sterilize tools with a 10% bleach solution. 3. Wash hands with soap and water after handling infected plants. 4. Do not compost the infected plants."
        },
        "Tomato Healthy": {
            "suggestion": "Plant is in optimal health.",
            "surveyed_solution": "Maintain regular irrigation, ensure balanced NPK fertilization, and perform weekly scouting for any early signs of pests."
        },
        " Healthy": {
            "suggestion": "Plant is in optimal health.",
            "surveyed_solution": "Maintain regular irrigation, ensure balanced NPK fertilization, and perform weekly scouting for any early signs of pests."
        },
        
        "Potato Early Blight": {
            "suggestion": "Apply Azoxystrobin spray.",
            "surveyed_solution": "1. Maintain high nitrogen and potassium levels to boost plant resistance. 2. Rotate crops with non-solanaceous plants. 3. Apply foliar fungicides early in the season."
        },
        "Potato Late Blight": {
            "suggestion": "Apply Ridomil Gold immediately.",
            "surveyed_solution": "1. Destroy all nearby potato waste or cull piles. 2. Apply protective fungicides containing mancozeb or chlorothalonil before symptoms appear if weather is cool and wet."
        },
        "Potato Healthy": {
            "suggestion": "Specimen is healthy.",
            "surveyed_solution": "Ensure balanced fertilization, proper hilling, and monitor for early symptoms."
        },
        
        "Pepper Bell Bacterial Spot": {
            "suggestion": "Spray a Copper-Mancozeb synergy.",
            "surveyed_solution": "1. Avoid working in the field while plants are wet. 2. Use drip irrigation instead of overhead sprinklers. 3. Plow under crop debris immediately after harvest."
        },
        "Pepper Bell Healthy": {
            "suggestion": "Plant shows no signs of disease.",
            "surveyed_solution": "Continue standard irrigation, mulching, and routine monitoring."
        },
        
        "Healthy": {
            "suggestion": "Optimal physiological state.",
            "surveyed_solution": "Maintain current maintenance schedule, ensure adequate soil drainage, and observe biosecurity practices."
        },
        "Unknown": {
            "suggestion": "Monitor leaf for changes.",
            "surveyed_solution": "1. Isolate the plant if possible. 2. Apply organic neem oil as a broad-spectrum preventive measure. 3. Consult a local agricultural extension office if symptoms worsen."
        }
    }
    
    # Try to find a match in the keys (case-insensitive)
    found_key = "Unknown"
    for key in recommendations.keys():
        if key.lower() == query_name.lower():
            found_key = key
            break
            
    advice = recommendations[found_key]
            
    return advice
