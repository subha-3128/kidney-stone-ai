# Kidney Stone Detection System

An open-source deep learning framework and web application for automated binary classification of kidney stones (*nephrolithiasis*) from renal medical images. The repository includes a model training pipeline with class weighting and image augmentation, an offline Grad-CAM explainability module, a Gradio-based inference backend configuration, and a React web interface connected via the `@gradio/client` library.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Dataset Specifications](#dataset-specifications)
- [Model Architecture and Training](#model-architecture-and-training)
- [Explainability (Grad-CAM)](#explainability-grad-cam)
- [Repository Structure](#repository-structure)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Model Training Setup](#model-training-setup)
  - [Local Inference Backend Setup](#local-inference-backend-setup)
- [Deployment and API Communication](#deployment-and-api-communication)
- [Limitations and Medical Disclaimer](#limitations-and-medical-disclaimer)

---

## Project Overview

Kidney stone disease (nephrolithiasis) is a common urological condition requiring timely detection to prevent renal impairment, obstruction, and infection. In clinical environments, high diagnostic volumes can delay scan reviews and triage.

This project implements an automated, computer-aided workflow for binary classification of renal scan images into two categories: **Normal** and **Stone**. 

The technical approach comprises:
1. **Model Training Pipeline**: A custom convolutional neural network (CNN) trained with data augmentation, inverse class weighting to counter class imbalance, and learning rate scheduling.
2. **Dual-Model Soft-Vote Inference**: Two independently trained model checkpoints are evaluated in parallel, and their sigmoid probabilities are averaged to produce the final classification and confidence score.
3. **Web User Interface**: A modern React/Vite progressive web application that accepts user-uploaded scans, displays inference results with visual confidence metrics, and generates client-side diagnostic summary reports.
4. **Serverless Inference Integration**: The frontend connects directly to a hosted Gradio application deployed on Hugging Face Spaces via WebSocket and HTTP tunnels.

---

## Key Features

- **Medical Image Ingestion**: Drag-and-drop or file browser upload supporting PNG, JPG, and JPEG image formats.
- **Binary Classification**: Categorizes uploaded renal scans as either `Normal` (no stone detected) or `Stone` (kidney stone detected).
- **Confidence Scoring**: Outputs an ensemble confidence percentage calculated from the mean prediction score.
- **Diagnostic Report Generation**: Generates and downloads an HTML summary report containing scan metadata, timestamp, classification outcome, visual confidence progress bar, and clinical disclaimers.
- **Offline Grad-CAM Module**: Implements Gradient-weighted Class Activation Mapping in Python to generate visual heatmaps of the final convolutional layer's activation regions.
- **Responsive Web Interface**: Features light and dark theme toggling, a collapsible sidebar, and responsive mobile-first layouts built with Tailwind CSS.

---

## System Architecture

The following diagram illustrates the relationship between the offline training workflow, the hosted inference service, and the web client.

```mermaid
flowchart TD
    subgraph Data & Offline Training
        A["Curated Dataset<br/>(9,416 Images)"] --> B["Data Augmentation &<br/>Class Weighting"]
        B --> C["Keras Sequential CNN<br/>Training Pipeline"]
        C --> D["Trained Weights<br/>(final_efficientnet_model.h5)"]
        C --> E["Trained Weights<br/>(final_resnet50_model.h5)"]
        C --> F["Grad-CAM Module<br/>(training/gradcam.py)"]
    end

    subgraph Inference Backend (Hugging Face Spaces)
        G["Gradio Application<br/>(app.py)"]
        D -->|Load Checkpoint| G
        E -->|Load Checkpoint| G
        H["Input Image<br/>(224x224 RGB)"] --> G
        G --> I["Dual Model Inference<br/>Probability Averaging"]
        I --> J["Output: Label & Confidence"]
    end

    subgraph Client Application (Vercel)
        K["React 18 + Vite SPA<br/>(react-frontend)"]
        L["User File Upload<br/>(Drag-and-Drop)"] --> K
        K -->|WebSocket / HTTP via @gradio/client| G
        J -->|JSON Response| K
        K --> M["Visual Metrics & HTML Report"]
    end
```

### Communication Flow
1. The user uploads an image via the React frontend (`react-frontend/src/pages/Upload.jsx`).
2. The client application connects to the Hugging Face Space using the `@gradio/client` SDK.
3. The image blob is submitted to the `/predict` Gradio endpoint.
4. The server standardizes the image (converts to RGB, resizes to 224x224, normalizes pixels to $[0, 1]$), runs inference across the loaded models, and returns the ensemble verdict and confidence score.
5. The frontend displays the results and allows exporting an HTML summary report.

---

## Technology Stack

### Frontend Application
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 18.2.0 | Core UI library |
| **Vite** | 4.3.0 | Build tool and local development server |
| **Tailwind CSS** | 3.3.0 | Utility-first styling framework |
| **@gradio/client** | 2.3.1 | Programmatic client for Gradio backend communication |
| **Framer Motion** | 10.0.0 | UI transitions and component animations |
| **Lucide React** | 0.263.0 | Iconography |
| **React Dropzone** | 14.2.3 | File upload and drag-and-drop management |
| **React Router DOM** | 6.8.0 | Client-side routing |
| **Recharts** | 2.5.0 | Data charting library |

### Machine Learning and Backend
| Technology | Version / Specification | Purpose |
| :--- | :--- | :--- |
| **Python** | 3.11 / 3.12 | Execution environment |
| **TensorFlow / Keras** | 2.x | Model definition, training, and `.h5` model loading |
| **Gradio** | 6.20.0 | Backend inference API and UI framework |
| **OpenCV (opencv-python-headless)** | 4.x | Heatmap generation and colormap blending in Grad-CAM |
| **Pillow (PIL)** | - | Image file reading and array conversion |
| **NumPy** | - | Tensor manipulation and array mathematics |
| **Scikit-learn** | - | Evaluation metrics and utilities |

---

## Dataset Specifications

The dataset is organized as a flat directory structure under [`dataset/`](dataset/) split into two distinct classes.

```text
dataset/
├── Normal/    # 4,414 images
└── stone/     # 5,002 images
```

### Class Distribution
| Class | Directory | Image Count | File Format | Native Resolution |
| :--- | :--- | :---: | :---: | :---: |
| **Normal** | [`dataset/Normal/`](dataset/Normal/) | 4,414 | JPEG (`.JPG`) | 512 x 512 |
| **Stone** | [`dataset/stone/`](dataset/stone/) | 5,002 | JPEG (`.JPG`) | 512 x 512 |
| **Total** | | **9,416** | | |

### Data Preprocessing and Augmentation
Images are loaded and augmented using Keras `ImageDataGenerator`:
- **Input Dimensions**: Resized from 512x512 down to $224 \times 224 \times 3$.
- **Pixel Scaling**: Normalized to the range $[0, 1]$ via `rescale=1./255`.
- **Validation Split**: 20% held-out validation split (`subset='validation'`), yielding:
  - **Training Set**: 80% (7,533 images)
  - **Validation Set**: 20% (1,883 images)
- **Data Augmentation Parameters** (applied to training subset):
  - Rotation range: $\pm 20^\circ$
  - Width shift: $\pm 20\%$
  - Height shift: $\pm 20\%$
  - Shear range: 0.2
  - Zoom range: $\pm 20\%$
  - Horizontal flip: Enabled
  - Brightness range: $[0.8, 1.2]$

### Class Imbalance Handling
To account for the imbalance between stone ($n=5{,}002$) and normal ($n=4{,}414$) images, training utilizes inverse frequency class weights:

$$w_c = \frac{N_{\text{total}}}{2 \cdot N_c}$$

- **Class 0 (Normal)**: $w_0 = \frac{9416}{2 \times 4414} \approx 1.0666$
- **Class 1 (Stone)**: $w_1 = \frac{9416}{2 \times 5002} \approx 0.9412$

---

## Model Architecture and Training

### Custom Sequential CNN Architecture
Both models trained by [`training/simple_train.py`](training/simple_train.py) utilize the following 4-block custom Sequential CNN architecture:

| Layer | Type | Specifications / Output Shape | Activation |
| :---: | :--- | :--- | :---: |
| 1 | `Conv2D` | 32 filters, $3 \times 3$ kernel, stride 1 | ReLU |
| 2 | `MaxPooling2D` | Pool size $2 \times 2$, stride 2 | - |
| 3 | `Conv2D` | 64 filters, $3 \times 3$ kernel, stride 1 | ReLU |
| 4 | `MaxPooling2D` | Pool size $2 \times 2$, stride 2 | - |
| 5 | `Conv2D` | 128 filters, $3 \times 3$ kernel, stride 1 | ReLU |
| 6 | `MaxPooling2D` | Pool size $2 \times 2$, stride 2 | - |
| 7 | `Conv2D` | 128 filters, $3 \times 3$ kernel, stride 1 | ReLU |
| 8 | `MaxPooling2D` | Pool size $2 \times 2$, stride 2 | - |
| 9 | `GlobalAveragePooling2D` | Reduces feature maps to 128-dimensional vector | - |
| 10 | `Dense` | 512 units | ReLU |
| 11 | `Dropout` | Rate = 0.5 | - |
| 12 | `Dense` | 256 units | ReLU |
| 13 | `Dropout` | Rate = 0.3 | - |
| 14 | `Dense` | 1 unit | Sigmoid |

> [!NOTE]
> **Implementation Clarification on Model Naming**:  
> In [`training/simple_train.py`](training/simple_train.py), the training loop executes across the list `['efficientnet', 'resnet50']` and saves the checkpoints as `final_efficientnet_model.h5` and `final_resnet50_model.h5`. Both output files instantiate the exact same custom 4-block Sequential CNN architecture described above, trained under different random weight initializations. Neither model utilizes standard pretrained architectures (such as torchvision or keras.applications EfficientNet-B0 or ResNet50).

### Training Hyperparameters
- **Loss Function**: Binary Cross-Entropy (`binary_crossentropy`)
- **Optimizer**: Adam (`learning_rate=0.001`)
- **Batch Size**: 32
- **Epochs**: Up to 25
- **Callbacks**:
  - `EarlyStopping`: Monitors validation loss with `patience=7` and `restore_best_weights=True`.
  - `ReduceLROnPlateau`: Monitors validation loss with reduction `factor=0.5` and `patience=3`.

### Dual-Model Inference Strategy
During inference in the backend, the image is passed through both loaded models:

$$\hat{p}_{\text{avg}} = \frac{p_{\text{model}_1}(x) + p_{\text{model}_2}(x)}{2}$$

The classification rule is defined as:
$$\text{Prediction} = \begin{cases} \text{Stone}, & \text{if } \hat{p}_{\text{avg}} > 0.5 \\ \text{Normal}, & \text{otherwise} \end{cases}$$

$$\text{Confidence (\%)} = \begin{cases} \hat{p}_{\text{avg}} \times 100, & \text{if Prediction} = \text{Stone} \\ (1 - \hat{p}_{\text{avg}}) \times 100, & \text{if Prediction} = \text{Normal} \end{cases}$$

If model checkpoints are not found at runtime, the backend enters a fallback demo mode generating mock confidence intervals for testing UI flows.

---

## Explainability (Grad-CAM)

The script [`training/gradcam.py`](training/gradcam.py) implements Gradient-weighted Class Activation Mapping (Grad-CAM) to inspect model attention regions:

1. **Feature Map Extraction**: Dynamically isolates the last 4D convolutional layer (`Conv2D`, 128 filters).
2. **Gradient Computation**: Uses `tf.GradientTape` to compute gradients of the class prediction score with respect to the feature map activations:
   $$\alpha_k = \frac{1}{Z} \sum_{i} \sum_{j} \frac{\partial y}{\partial A_{ij}^k}$$
3. **Heatmap Generation**: Pools gradients across spatial dimensions, weights each channel in the feature map, applies a ReLU threshold to filter negative contributions, and normalizes the output to $[0, 1]$.
4. **Color Blending**: Resizes the heatmap to match original image dimensions using OpenCV, applies a `cv2.COLORMAP_JET` color transform, and alpha-blends the result ($\alpha = 0.6$) onto the input scan.

> [!IMPORTANT]
> **Implementation Scope**:  
> The Grad-CAM logic currently exists as a standalone Python utility in [`training/gradcam.py`](training/gradcam.py). It is not exposed as an active API endpoint in the production Gradio service. The "View Heatmap" button in the frontend is designed to query a `/explain` endpoint, which is not yet wired to the backend inference server.

---

## Repository Structure

```text
kidney-stone-ai/
├── dataset/                        # Image dataset
│   ├── Normal/                     # 4,414 normal renal scans (.JPG)
│   └── stone/                      # 5,002 kidney stone scans (.JPG)
├── paper_figures/                  # Architectural diagrams and training figures
│   ├── class_distribution.png
│   ├── confidence_hist.png
│   ├── detailed_architecture.png
│   ├── gradcam_example.png
│   ├── system_overview.png
│   └── training_curves.png
├── react-frontend/                 # React 18 + Vite frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Header with theme toggle controls
│   │   │   └── Sidebar.jsx         # Collapsible sidebar navigation
│   │   ├── pages/
│   │   │   ├── About.jsx           # Technical overview and documentation page
│   │   │   ├── Contact.jsx         # Contact template component
│   │   │   ├── History.jsx         # History template component
│   │   │   ├── Home.jsx            # Dashboard template component
│   │   │   └── Upload.jsx          # File upload, analysis, and report generation
│   │   ├── App.jsx                 # Routing configuration
│   │   ├── index.css               # Tailwind styling and custom UI utilities
│   │   └── main.jsx                # Application root entrypoint
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies and scripts
│   ├── tailwind.config.js          # Tailwind CSS design system configuration
│   └── vite.config.js              # Vite server configuration (port 3000)
├── training/                       # Offline model development
│   ├── gradcam.py                  # Grad-CAM heatmap extraction script
│   └── simple_train.py             # CNN training script with augmentation
├── .gitignore                      # Git exclusion rules
├── IEEE_BIC.pdf                    # Compiled PDF draft of the research paper
├── requirements.txt                # Python dependencies for training and Grad-CAM
├── research_paper.md               # LaTeX source of research paper
└── README.md                       # Project documentation
```

*Note on Backend Code: The inference backend is hosted externally on Hugging Face Spaces (`nubruuuu/kidney-stone-backend`). When cloned locally for development, backend files reside in `kidney-stone-backend/` (which is excluded from this repository via `.gitignore`).*

---

## Installation and Setup

### Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Python**: Version 3.11 or 3.12
- **Git**

### Clone Repository
```bash
git clone https://github.com/subha-3128/kidney-stone-ai.git
cd kidney-stone-ai
```

---

### Frontend Setup

The frontend runs locally and connects directly to the hosted inference service.

1. Navigate to the frontend directory:
   ```bash
   cd react-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

To build the frontend for production:
```bash
npm run build
npm run preview
```

---

### Model Training Setup

To retrain the models locally from the dataset:

1. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the training script:
   ```bash
   python training/simple_train.py
   ```

The script will:
- Read images from [`dataset/`](dataset/).
- Compute class weights for `Normal` and `stone`.
- Train the custom CNN model for two iterations.
- Save `final_efficientnet_model.h5` and `final_resnet50_model.h5` in the working directory.

---

### Local Inference Backend Setup

If you wish to run the Gradio backend server locally:

1. Obtain the backend script `app.py` and model files (`final_efficientnet_model.h5`, `final_resnet50_model.h5`).
2. Install backend dependencies:
   ```bash
   pip install gradio tensorflow pillow numpy
   ```
3. Start the Gradio app:
   ```bash
   python app.py
   ```
4. Update the client connection in [`react-frontend/src/pages/Upload.jsx`](react-frontend/src/pages/Upload.jsx#L41) to target your local server instance (`http://localhost:7860`) instead of the Hugging Face Space.

---

## Deployment and API Communication

The production application is deployed across two decoupled services:

| Component | Platform | URL |
| :--- | :--- | :--- |
| **Frontend Web App** | Vercel | [https://kidney-stone-ai.vercel.app/](https://kidney-stone-ai.vercel.app/) |
| **Inference Server** | Hugging Face Spaces | [https://huggingface.co/spaces/nubruuuu/kidney-stone-backend](https://huggingface.co/spaces/nubruuuu/kidney-stone-backend) |

### API Communication Details
- The frontend does not bundle machine learning weights or an embedded Python runtime.
- Client requests are orchestrated using `@gradio/client`, establishing an RPC channel with the Hugging Face Space.
- Calls to `client.predict("/predict", { image: imageBlob })` serialize the uploaded scan and transmit it to the server's Gradio predict endpoint, returning the classification label and confidence value.

---

## Limitations and Medical Disclaimer

### Technical Limitations
- **Evaluation Metrics**: Model performance should be assessed on independent, multi-center clinical validation sets before drawing conclusions regarding generalization across different imaging scanners, protocols, or patient cohorts.
- **Explainability Integration**: Grad-CAM visualization is currently implemented only as an offline Python module and is not connected to the live web interface.
- **Architectural Uniformity**: While model checkpoints use distinct filenames, both share the same underlying custom Sequential CNN architecture.

### Medical Disclaimer
> [!CAUTION]
> **This software is designed solely for educational, academic, and scientific research purposes.**  
> - Predictions and confidence scores generated by this system do **not** constitute a clinical diagnosis, prognosis, or medical advice.
> - The software is **not** an FDA-approved, CE-marked, or clinically certified medical device.
> - This application must **never** be used as a substitute for professional medical evaluation, clinical radiologist review, or hospital diagnostic procedures.
> - Patients experiencing abdominal pain, flank pain, hematuria, or other symptoms should immediately seek evaluation from a licensed healthcare practitioner.
