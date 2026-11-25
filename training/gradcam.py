import tensorflow as tf
import numpy as np
import cv2
from tensorflow.keras.models import load_model


class GradCAM:
    def __init__(self, model_path):
        self.model = load_model(model_path)
        self.last_conv_layer = self.get_last_conv_layer()
        if self.last_conv_layer is None:
            raise ValueError(f"No 4D convolutional layer found in model: {model_path}")

    def get_last_conv_layer(self):
        # Find the last convolutional layer across Keras 2 and Keras 3 models
        for layer in reversed(self.model.layers):
            if isinstance(layer, tf.keras.layers.Conv2D):
                return layer.name
            output_shape = getattr(layer, 'output_shape', None)
            if output_shape is not None and len(output_shape) == 4:
                return layer.name
        return None

    def generate_gradcam(self, img_array, class_idx=0):
        grad_model = tf.keras.models.Model(
            [self.model.inputs],
            [self.model.get_layer(self.last_conv_layer).output, self.model.output]
        )

        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            if class_idx < 0 or class_idx >= predictions.shape[-1]:
                raise ValueError(
                    f"class_idx={class_idx} out of bounds for output shape {predictions.shape}"
                )
            loss = predictions[:, class_idx]

        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        conv_outputs = conv_outputs[0]
        heatmap = tf.squeeze(conv_outputs @ pooled_grads[..., tf.newaxis])

        # Safe normalization avoiding NaN when max activation is zero
        positive_map = tf.maximum(heatmap, 0)
        heatmap = tf.math.divide_no_nan(positive_map, tf.math.reduce_max(positive_map))
        return heatmap.numpy()

    def create_heatmap_overlay(self, img, heatmap, alpha=0.6):
        if img.ndim == 2:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)

        heatmap_resized = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
        heatmap_uint8 = np.uint8(255 * np.clip(heatmap_resized, 0.0, 1.0))
        heatmap_color = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)

        return cv2.addWeighted(img, 1 - alpha, heatmap_color, alpha, 0)
