import cv2
import numpy as np

def segment_leaf(image):
    """
    Segments the leaf from the background using HSV thresholding and contour detection.
    """
    # Convert to HSV
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define range for green color (leaf)
    # This might need tuning based on the dataset
    lower_green = np.array([25, 40, 40])
    upper_green = np.array([90, 255, 255])
    
    # Threshold the HSV image to get only green colors
    mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Morphological operations to clean up the mask
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    # Find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        # Get the largest contour (the leaf)
        c = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(c)
        
        # Create a blank mask for the largest contour
        clean_mask = np.zeros(mask.shape, dtype=np.uint8)
        cv2.drawContours(clean_mask, [c], -1, 255, -1)
        
        # Bitwise-AND mask and original image
        segmented = cv2.bitwise_and(image, image, mask=clean_mask)
        
        # Crop to the bounding box of the leaf
        cropped = segmented[y:y+h, x:x+w]
        return cropped
    
    return image

def preprocess_image(image_path, target_size=(224, 224), segment=False):
    """
    Loads and resizes an image for the model (segmentation disabled to match training).
    """
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image at {image_path}")
    
    # BGR to RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Optional segmentation
    if segment:
        try:
            img = segment_leaf(img)
        except Exception as e:
            print(f"Segmentation failed: {e}")
    
    # Resize
    img = cv2.resize(img, target_size)
    
    # Normalize to [0, 1]
    img = img.astype('float32') / 255.0
    
    return img
