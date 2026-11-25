import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from pathlib import Path

VALID_IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff'}


class SimpleKidneyStoneDetector:
    def __init__(self, data_path, img_size=(224, 224), batch_size=32, split_seed=42):
        self.data_path = data_path
        self.img_size = img_size
        self.batch_size = batch_size
        self.split_seed = split_seed

    def create_augmentation(self):
        return ImageDataGenerator(
            rescale=1./255,
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True,
            brightness_range=[0.8, 1.2],
            validation_split=0.2
        )

    def create_validation_generator(self):
        # Keep validation unaugmented so EarlyStopping evaluates clean scans
        return ImageDataGenerator(
            rescale=1./255,
            validation_split=0.2
        )

    def _count_images(self, directory):
        return sum(
            1 for p in Path(directory).iterdir()
            if p.is_file() and not p.name.startswith('.') and p.suffix.lower() in VALID_IMAGE_EXTS
        )

    def calculate_class_weights(self):
        normal_count = self._count_images(Path(self.data_path) / 'Normal')
        stone_count = self._count_images(Path(self.data_path) / 'stone')

        if normal_count == 0 or stone_count == 0:
            raise ValueError(f"Empty class directory in {self.data_path}: Normal={normal_count}, Stone={stone_count}")

        total = normal_count + stone_count
        class_weights = {
            0: total / (2 * normal_count),
            1: total / (2 * stone_count)
        }

        print(f"Dataset: Normal={normal_count}, Stone={stone_count}")
        print(f"Class weights: {class_weights}")
        return class_weights

    def create_simple_model(self, name=None):
        model = Sequential([
            Conv2D(32, (3, 3), activation='relu', input_shape=(*self.img_size, 3)),
            MaxPooling2D(2, 2),
            Conv2D(64, (3, 3), activation='relu'),
            MaxPooling2D(2, 2),
            Conv2D(128, (3, 3), activation='relu'),
            MaxPooling2D(2, 2),
            Conv2D(128, (3, 3), activation='relu'),
            MaxPooling2D(2, 2),
            GlobalAveragePooling2D(),
            Dense(512, activation='relu'),
            Dropout(0.5),
            Dense(256, activation='relu'),
            Dropout(0.3),
            Dense(1, activation='sigmoid')
        ])

        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy']
        )

        return model

    def train_models(self):
        train_datagen = self.create_augmentation()
        val_datagen = self.create_validation_generator()
        class_weights = self.calculate_class_weights()

        train_generator = train_datagen.flow_from_directory(
            self.data_path,
            target_size=self.img_size,
            batch_size=self.batch_size,
            class_mode='binary',
            subset='training',
            seed=self.split_seed,
            classes=['Normal', 'stone']
        )

        val_generator = val_datagen.flow_from_directory(
            self.data_path,
            target_size=self.img_size,
            batch_size=self.batch_size,
            class_mode='binary',
            subset='validation',
            seed=self.split_seed,
            shuffle=False,
            classes=['Normal', 'stone']
        )

        for model_name in ['efficientnet', 'resnet50']:
            print(f"\n=== Training {model_name.upper()} Model ===")
            model = self.create_simple_model(model_name)

            callbacks = [
                tf.keras.callbacks.EarlyStopping(patience=7, restore_best_weights=True),
                tf.keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=3)
            ]

            model.fit(
                train_generator,
                epochs=25,
                validation_data=val_generator,
                callbacks=callbacks,
                class_weight=class_weights
            )

            model.save(f'final_{model_name}_model.h5')
            print(f"{model_name} model saved!")

        return True


def main():
    detector = SimpleKidneyStoneDetector('../dataset')

    print("Starting simple CNN training...")
    detector.train_models()

    print("\n=== Training Complete ===")
    print("Models saved: final_efficientnet_model.h5, final_resnet50_model.h5")


if __name__ == "__main__":
    main()
