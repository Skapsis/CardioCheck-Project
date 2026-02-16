# 🫀 CardioCheck - AI-Powered Cardiovascular Risk Assessment

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-F37626?style=for-the-badge&logo=jupyter&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Professional ML-powered web application for cardiovascular disease risk prediction**

[🚀 Live Demo](#) • [📖 Documentation](EXPLICACION_DATASET_UCI.md) • [🐛 Report Bug](#) • [✨ Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Mathematical Model](#-mathematical-model)
- [Mobile App](#-mobile-app)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**CardioCheck** is a comprehensive cardiovascular risk assessment platform that bridges the gap between Machine Learning research and production-ready applications. It demonstrates a complete ML pipeline from data analysis to deployment.

### 🔬 What Makes This Project Unique?

- ✅ **Real ML Model**: Not simulated—uses actual Logistic Regression trained on UCI Heart Disease dataset (303 patients)
- ✅ **Production-Ready**: Full pipeline with StandardScaler normalization and sigmoid function implementation in JavaScript
- ✅ **Educational**: Transparent codebase with extensive documentation and debugging tools built-in
- ✅ **Professional UI**: Modern healthcare-grade interface with clinical color palette and animations
- ✅ **Mobile-First**: Includes React Native/Expo version for native iOS/Android apps

---

## ✨ Features

### 🧠 Machine Learning Pipeline

<table>
<tr>
<td width="50%">

**Model Training (Python/Jupyter)**
- 📊 **Logistic Regression** with sklearn
- 🔄 **StandardScaler** normalization
- 📈 Correlation heatmap visualization
- ✅ 5-fold cross-validation
- 🎯 80.3% accuracy on test set
- 💾 Model serialization (joblib/pickle)
- 📐 13 clinical features support

</td>
<td width="50%">

**Production Deployment (React)**
- 🎯 Real sigmoid formula: `P = 1/(1+e^(-z))`
- 🔢 Exact coefficient replication
- 📐 Proper feature normalization
- 🐛 Built-in debugging & validation
- ⚡ Client-side inference (no backend)
- 📱 Fully responsive design
- 🌐 Spanish interface

</td>
</tr>
</table>

### 💻 Web Application

| Feature | Description |
|---------|-------------|
| 🎨 **Modern UI** | Clean, professional healthcare interface with Tailwind CSS |
| 📊 **Interactive Form** | 7 primary clinical parameters with real-time validation |
| 🎭 **Visual Feedback** | Animated circular progress, color-coded risk levels |
| 📈 **Model Metrics** | Display accuracy, precision, recall, F1, AUC-ROC, CV scores |
| 🧪 **Test Cases** | Pre-loaded high/low risk scenarios for quick testing |
| 🔍 **Console Debugging** | Step-by-step calculation logging for transparency |
| ♿ **Accessible** | WCAG compliant, keyboard navigation support |

---

## 🛠 Tech Stack

### Frontend (Web)
```json
{
  "framework": "React 18.2",
  "styling": "Tailwind CSS 3.3",
  "icons": "Lucide React",
  "bundler": "Vite 5.0",
  "language": "JavaScript (ES6+)"
}
```

### Backend (ML)
```json
{
  "language": "Python 3.13",
  "ml": "scikit-learn",
  "data": "pandas, numpy",
  "viz": "matplotlib, seaborn",
  "notebook": "Jupyter"
}
```

### Mobile
```json
{
  "framework": "React Native 0.73",
  "runtime": "Expo SDK 50",
  "styling": "StyleSheet API",
  "language": "JavaScript"
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.10+ (for ML training)
- **Git**

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/cardiocheck.git
cd cardiocheck
```

#### 2️⃣ Install Web Dependencies

```bash
npm install
# or
yarn install
```

#### 3️⃣ Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

#### 4️⃣ Build for Production

```bash
npm run build
npm run preview
```

### 🐍 Running the ML Notebook (Optional)

If you want to retrain the model or explore the data:

```bash
# Install Python dependencies
pip install pandas numpy matplotlib seaborn scikit-learn jupyter joblib

# Launch Jupyter
jupyter notebook ConexionData.ipynb
```

**Run all cells** to:
- Train the Logistic Regression model
- Generate visualizations (correlation heatmap, ROC curve, confusion matrix)
- Export model parameters as JSON
- Save model with joblib

Copy the JSON output and paste into `src/App.jsx` at line ~45 to update parameters.

---

## 📁 Project Structure

```
CardioCheck-Project/
├── 📱 mobile/                    # React Native/Expo mobile app
│   ├── App.js                   # Main mobile application
│   ├── package.json
│   ├── app.json
│   └── assets/
│
├── 🌐 src/                       # React web application
│   ├── App.jsx                  # Main app + ML inference logic
│   ├── main.jsx                 # React entry point
│   ├── index.css               # Global styles
│   └── components/
│       ├── Header.jsx          # App header with branding
│       ├── HeartRiskForm.jsx   # Input form + test cases
│       ├── ResultDisplay.jsx   # Results visualization
│       └── Disclaimer.jsx      # Medical disclaimer
│
├── 🧠 ML & Data/
│   ├── ConexionData.ipynb      # Jupyter notebook (training)
│   ├── heart-disease.csv       # UCI dataset (303 patients)
│   └── *.md                    # Documentation files
│
├── ⚙️ Configuration/
│   ├── vite.config.js          # Vite bundler config
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── postcss.config.js       # PostCSS config
│   └── package.json            # Dependencies
│
└── 📄 Documentation/
    ├── README.md                        # This file
    ├── EXPLICACION_DATASET_UCI.md       # Dataset analysis
    ├── GUIA_DEBUGGING_CONSOLA.md        # Debugging guide
    └── SOLUCION_PROBLEMA_50_PORCIENTO.md # 50% bug solution
```

---

## 🧮 Mathematical Model

### Logistic Regression Formula

The heart of CardioCheck is a **binary classification model** trained on the UCI Heart Disease dataset:

```
P(disease = 1 | X) = σ(z) = 1 / (1 + e^(-z))
```

Where:
- **P**: Probability of having heart disease (0 to 1)
- **σ**: Sigmoid function
- **z**: Linear combination of features

### Step-by-Step Calculation

#### 1. Feature Normalization (StandardScaler)
```javascript
normalized_value = (raw_value - mean) / std_deviation
```

Example:
```javascript
age_normalized = (60 - 54.29) / 9.13 = 0.625
```

#### 2. Linear Score Calculation
```javascript
z = intercept + Σ(coefficient_i × normalized_feature_i)
```

Example:
```javascript
z = 0.1316 + (0.0177 × 0.625) + (-0.7140 × 0.683) + ...
  = 0.1316 + 0.0111 - 0.4878 + 1.9171 - ...
  = 2.45
```

#### 3. Sigmoid Transformation
```javascript
probability = 1 / (1 + Math.exp(-z))
```

Example:
```javascript
P = 1 / (1 + e^(-2.45))
  = 1 / (1 + 0.086)
  = 0.920 or 92% risk
```

### Model Parameters

| Feature | Coefficient | Mean | Std Dev | Impact |
|---------|-------------|------|---------|--------|
| **age** | +0.0177 | 54.29 | 9.13 | ⬆️ Increases risk |
| **sex** | -0.7140 | 0.68 | 0.47 | ⬇️ Female = lower risk |
| **cp** | +0.9377 | 0.94 | 1.01 | ⬆️ Pain = higher risk |
| **trestbps** | -0.2114 | 131.71 | 17.96 | ⬇️ Negative impact |
| **chol** | -0.4592 | 244.88 | 47.75 | ⬇️ Negative impact |
| **fbs** | -0.0636 | 0.14 | 0.35 | ⬇️ Minor impact |
| **restecg** | +0.2355 | 0.55 | 0.53 | ⬆️ Abnormal = higher |
| **thalach** | +0.5396 | 150.12 | 21.93 | ⬆️ High rate = risk |
| **exang** | -0.4759 | 0.34 | 0.47 | ⬇️ Reduces risk |
| **oldpeak** | -0.5948 | 1.07 | 1.20 | ⬇️ Reduces risk |
| **slope** | +0.3079 | 1.41 | 0.62 | ⬆️ Increases risk |
| **ca** | -0.5592 | 0.74 | 1.04 | ⬇️ Reduces risk |
| **thal** | -0.6216 | 2.34 | 0.60 | ⬇️ Reduces risk |

**Intercept**: 0.1316

### Model Performance

```
✅ Accuracy:  80.3%
✅ Precision: 76.9%
✅ Recall:    90.9%
✅ F1-Score:  83.3%
✅ AUC-ROC:   86.9%
✅ CV-Score:  83.1% (5-fold)
```

---

## 📱 Mobile App

CardioCheck includes a **native mobile version** built with React Native and Expo.

### Installation

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with:
- **iOS**: Camera app
- **Android**: Expo Go app (download from Play Store)

### Features

- ✅ Same ML algorithm as web version
- ✅ Native UI components (`<View>`, `<TextInput>`, `<TouchableOpacity>`)
- ✅ Offline-first (no internet required)
- ✅ Smooth animations with `Animated` API
- ✅ Works on iOS and Android
- ✅ Touch-optimized inputs

---

## 📸 Screenshots

### Web Application

![Home Screen](./docs/screenshots/home.png)
*Modern clinical interface with gradient backgrounds*

![Form Input](./docs/screenshots/form.png)
*Interactive form with 7 clinical parameters and validation*

![Results Display](./docs/screenshots/results.png)
*Animated circular progress with risk assessment and recommendations*

![Model Metrics](./docs/screenshots/metrics.png)
*Professional dashboard with 6 performance indicators*

### Mobile App

![Mobile Home](./docs/screenshots/mobile-home.png)
*Native mobile interface optimized for touch*

![Mobile Results](./docs/screenshots/mobile-results.png)
*Touch-optimized result display with smooth animations*

---

## 🔬 Dataset Information

**Source**: UCI Machine Learning Repository - Heart Disease Data  
**Origin**: Cleveland Clinic Foundation  
**Samples**: 303 patients  
**Features**: 13 clinical attributes  
**Target**: Binary (0 = No disease, 1 = Disease present)

### Feature Descriptions

| Feature | Description | Range/Values |
|---------|-------------|--------------|
| **age** | Age in years | 29-77 |
| **sex** | Biological sex | 0=Female, 1=Male |
| **cp** | Chest pain type | 0-3 (0=Asymptomatic, 3=Typical angina) |
| **trestbps** | Resting blood pressure | mm Hg (80-220) |
| **chol** | Serum cholesterol | mg/dl (100-600) |
| **fbs** | Fasting blood sugar > 120 mg/dl | 0=False, 1=True |
| **restecg** | Resting ECG results | 0-2 (0=Normal) |
| **thalach** | Max heart rate achieved | bpm (60-220) |
| **exang** | Exercise induced angina | 0=No, 1=Yes |
| **oldpeak** | ST depression induced by exercise | Float (0-6.2) |
| **slope** | Slope of peak exercise ST segment | 0-2 |
| **ca** | Number of major vessels colored | 0-3 |
| **thal** | Thalassemia | 0-3 (0=Normal, 3=Reversible defect) |

📖 **Read more**: [EXPLICACION_DATASET_UCI.md](EXPLICACION_DATASET_UCI.md)

---

## 🧪 Testing

### Built-in Test Cases

The app includes pre-configured test scenarios based on real dataset statistics:

**🔴 High Risk Case** (Expected: >50% probability):
```javascript
{
  age: 60,
  sex: 'male',
  cp: 2,              // Chest pain present
  trestbps: 145,
  chol: 250,
  fbs: true,
  restecg: 1,
  thalach: 160,       // High heart rate
  exang: false,
  oldpeak: 0.5,       // Low ST depression
  slope: 1,
  ca: 0,              // Few vessels visible
  thal: 2
}
```

**🟢 Low Risk Case** (Expected: <50% probability):
```javascript
{
  age: 50,
  sex: 'male',
  cp: 0,              // Asymptomatic
  trestbps: 125,
  chol: 210,
  fbs: false,
  restecg: 0,
  thalach: 135,       // Lower heart rate
  exang: false,
  oldpeak: 1.8,       // Higher ST depression
  slope: 1,
  ca: 1,              // More vessels visible
  thal: 2
}
```

### Console Debugging

Open browser DevTools (F12) to see detailed calculation logs:
- ✅ Parameter validation (checks for default values)
- ✅ Type checking (ensures all inputs are numbers)
- ✅ Normalization steps (shows formula for each feature)
- ✅ z-score calculation (displays each contribution)
- ✅ Sigmoid transformation (breaks down the math)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Development Guidelines

- ✅ Follow ESLint rules
- ✅ Write clear commit messages
- ✅ Update documentation for new features
- ✅ Add tests when applicable
- ✅ Maintain code comments for complex logic

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 CardioCheck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

See [LICENSE](LICENSE) file for full details.

---

## ⚠️ Medical Disclaimer

**IMPORTANT**: This application is for **educational and informational purposes only**.

- ❌ **NOT** a substitute for professional medical advice
- ❌ **NOT** approved for clinical diagnosis
- ❌ **NOT** validated by health regulatory authorities (FDA, EMA, etc.)
- ✅ **Always** consult qualified healthcare professionals
- ✅ **Seek** immediate medical attention for emergencies (call 911)

This tool is designed for learning about machine learning in healthcare contexts and should **never** be used for actual medical decision-making.

---

## 🙏 Acknowledgments

- **UCI Machine Learning Repository** for providing the Heart Disease dataset
- **Cleveland Clinic Foundation** for the original data collection
- **scikit-learn** community for excellent ML tools
- **React** and **Tailwind CSS** teams for modern web frameworks
- **Expo** team for simplifying mobile development

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/cardiocheck/issues)
- **Email**: your.email@example.com
- **LinkedIn**: [Your Profile](#)

---

<div align="center">

**Built with ❤️ by [Your Name]**

*If you find this project useful, please consider giving it a ⭐*

[⬆ Back to Top](#-cardiocheck---ai-powered-cardiovascular-risk-assessment)

</div>
