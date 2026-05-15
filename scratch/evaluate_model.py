import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import json

def evaluate():
    model_path = 'model/crop_model.h5'
    data_dir = 'processed_dataset'
    
    model = tf.keras.models.load_model(model_path)
    
    datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
    
    val_generator = datagen.flow_from_directory(
        data_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='validation',
        shuffle=False
    )
    
    results = model.evaluate(val_generator)
    print(f"Loss: {results[0]}")
    print(f"Accuracy: {results[1]}")

if __name__ == '__main__':
    evaluate()
