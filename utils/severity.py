import cv2
import numpy as np

def calculate_severity(image_path):
    """
    Calculates the severity of the disease based on infected area ratio.
    """
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        return 0, "Unknown"
    
    # Convert to HSV
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Define range for healthy green
    lower_green = np.array([25, 40, 40])
    upper_green = np.array([90, 255, 255])
    
    # Define range for "diseased" spots (brown, yellow, pale)
    # This is a heuristic and might need adjustment
    lower_diseased = np.array([0, 20, 20])
    upper_diseased = np.array([25, 255, 255]) # Yellowish/Brownish
    
    # Mask for total leaf area (green + diseased)
    mask_green = cv2.inRange(hsv, lower_green, upper_green)
    mask_diseased = cv2.inRange(hsv, lower_diseased, upper_diseased)
    
    total_leaf_mask = cv2.bitwise_or(mask_green, mask_diseased)
    total_leaf_area = np.sum(total_leaf_mask > 0)
    
    if total_leaf_area == 0:
        return 0, "No Leaf Detected"
    
    infected_area = np.sum(mask_diseased > 0)
    
    infection_ratio = (infected_area / total_leaf_area) * 100
    
    # Determine level
    if infection_ratio < 7.0:
        level = "Healthy"
    elif infection_ratio <= 15:
        level = "Mild"
    elif infection_ratio <= 35:
        level = "Moderate"
    else:
        level = "Severe"
        
    return round(infection_ratio, 2), level
