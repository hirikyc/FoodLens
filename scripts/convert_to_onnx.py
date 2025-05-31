import tensorflow as tf
import tf2onnx

# Load the Keras model
model = tf.keras.models.load_model('model_indonesian_food (1).keras')

# Convert to ONNX
input_signature = [tf.TensorSpec([1, 224, 224, 3], tf.float32, name="input")]
onnx_model, _ = tf2onnx.convert.from_keras(model, input_signature, opset=13)

# Save the ONNX model
with open("model_indonesian_food (1).onnx", "wb") as f:
    f.write(onnx_model.SerializeToString()) 