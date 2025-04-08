# SkinIntel - AI-Powered Skin Disease Detection

SkinIntel is a full-stack AI-powered web application designed to detect skin diseases from user-uploaded images. It combines the power of deep learning with an elegant, responsive frontend to help users get quick, AI-based skin health insights.

---

## Project Structure

```
saiabhiramjaini-skinintel/
├── client/             # React + TypeScript frontend (Vite)
├── server/             # Flask backend with prediction & auth routes
└── training model/     # Jupyter notebook & trained CNN model
```

---

## Features

- **Skin Disease Detection** using CNN-based deep learning model
- **User Authentication** (Sign In / Sign Up)
- **Informative Pages**: Home, Detection Steps, Disease Info
- **Fast & Minimal UI** powered by React + Tailwind
- **Flask API Integration** for predictions & auth
- **Deployed on Vercel + Render (or your choice)**

---

## Tech Stack

### Frontend

- React + TypeScript (Vite)
- TailwindCSS
- Form Handling + Reusable UI Components
- Axios for API Communication

### Backend

- Python Flask
- TensorFlow / Keras for Deep Learning

### Model

- Convolutional Neural Network (CNN)
- Trained using a skin disease image dataset
- Exported as `model.h5`

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/saiabhiramjaini/SkinIntel.git
cd saiabhiramjaini-skinintel
```

---

### 2. Setup Backend (Flask)

```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

> Make sure `model.h5` is present in `server/models/`

#### Run the Flask App

```bash
python app.py
```

> Flask will run on `http://localhost:5000`

---

### 3. Setup Frontend (React)

```bash
cd ../client
npm install
```

#### Run the React App

```bash
npm run dev
```

> Vite will start the frontend on `http://localhost:5173`

---

## Key Pages

| Page             | Description                             |
|------------------|-----------------------------------------|
| `/`              | Landing Page with Hero, Features, etc.  |
| `/auth`          | Sign In / Sign Up Form                  |
| `/predict`       | Upload image for disease prediction     |
| `/detection`     | Step-by-step explanation of process     |

---

## Model Training

To retrain the model or view training insights:

```bash
cd "training model"
jupyter notebook Skin_Disease_CNN.ipynb
```

---

