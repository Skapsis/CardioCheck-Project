<div align="center">

# 🫀 CardioCheck

**Evaluación de Riesgo Cardiovascular con Machine Learning**

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![React Native](https://img.shields.io/badge/React%20Native-0.73-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)](https://expo.dev/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python)](https://python.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-F7931E?logo=scikit-learn)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

[🚀 Demo Live](https://cardiocheck.netlify.app) • [📱 Móvil](#-instalación-móvil) • [🧠 Modelo ML](#-cómo-funciona-el-modelo) • [📚 Instalación](#-instalación)

</div>

---

## 📋 Descripción

**CardioCheck** es una aplicación **web y móvil** que evalúa el riesgo de enfermedad cardiovascular utilizando un modelo de **Regresión Logística** entrenado con el dataset [UCI Heart Disease (Cleveland)](https://archive.ics.uci.edu/ml/datasets/heart+disease). 

### 🎯 **Características Principales**
- 🧠 **Modelo ML Real**: Precisión del **80.3%** con StandardScaler
- ⚡ **Evaluación Instantánea**: Cálculo en tiempo real
- 🌐 **Multiplataforma**: Web (React) + Móvil (React Native)
---

## 📊 **Métricas del Modelo ML**

| Métrica | Valor | Descripción |
|---------|-------|-------------|
| **Accuracy** | **80.3%** | Precisión general del modelo |
| **Precision** | **76.9%** | Exactitud de predicciones positivas |
| **Recall** | **90.9%** | Capacidad de detectar casos positivos |
| **F1-Score** | **83.3%** | Promedio harmónico de Precision y Recall |
| **AUC-ROC** | **86.9%** | Área bajo la curva ROC |
| **CV Score** | **83.1%** | Validación cruzada |

---

## 🏗️ **Estructura del Proyecto**

```
CardioCheck-Project/
├── 🌐 WEB VERSION (React + Vite)
│   ├── src/
│   │   ├── App.jsx                 # Aplicación principal web
│   │   ├── components/
│   │   │   ├── Header.jsx          # Encabezado
│   │   │   ├── HeartRiskForm.jsx   # Formulario de evaluación
│   │   │   ├── ResultDisplay.jsx   # Visualización de resultados
│   │   │   └── Disclaimer.jsx      # Aviso legal
│   │   └── index.css              # Estilos Tailwind
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── 📱 MOBILE VERSION (React Native + Expo)
│   ├── mobile/
│   │   ├── App.js                 # Aplicación móvil completa
│   │   ├── app.json              # Configuración Expo
│   │   ├── package.json          # Dependencias móvil
│   │   └── README.md             # Documentación móvil
│
├── 🧠 MACHINE LEARNING
│   ├── ConexionData.ipynb        # Notebook entrenamiento del modelo
│   ├── heart-disease.csv         # Dataset UCI Cleveland
│   └── docs/                     # Documentación técnica
│
├── 📚 DOCUMENTACIÓN
│   ├── README.md                 # Este archivo
│   ├── LICENSE                   # Licencia MIT
│   └── GUIA_*.md                # Guías técnicas
└── .gitignore
```

---

## 🧠 **Cómo Funciona el Modelo**

CardioCheck utiliza **Regresión Logística** con **StandardScaler** para normalización:

### **Proceso Matemático**

#### **1️⃣ Normalización (StandardScaler)**
```javascript
normalized_value = (valor_crudo - media) / desviación_estándar
```

#### **2️⃣ Cálculo del Score Lineal (z)**  
```javascript
z = intercepto + Σ(coeficiente_i × valor_normalizado_i)
```

#### **3️⃣ Función Sigmoide**
```javascript
P = 1 / (1 + e^(-z))
```

#### **4️⃣ Interpretación**
- **P < 30%** → 🟢 Riesgo Bajo
- **30% ≤ P < 70%** → 🟡 Riesgo Moderado  
- **P ≥ 70%** → 🔴 Riesgo Alto

### **📋 Características Clínicas (7 principales)**
1. **Edad** (29-77 años)
2. **Sexo** (Masculino/Femenino) 
3. **Tipo de Dolor Torácico** (4 categorías)
4. **Presión Sistólica** (94-200 mmHg)
5. **Colesterol** (126-564 mg/dl)
6. **Glucemia en Ayunas** (>120 mg/dl: Sí/No)
7. **Frecuencia Cardíaca Máxima** (71-202 bpm)

---

## 🎬 Demo

### 💻 Aplicación Web

**1. Aviso de Uso Educativo**
![Aviso Educativo](screenshots/1-aviso.png)

**2. Formulario de Evaluación (Vacío)**
![Dashboard Web](screenshots/2-formulario.png)

**3. Evaluación y Resultado**
![Resultado Moderado](screenshots/3-resultado.png)

**4. Panel de Métricas del Modelo**
![Métricas y Dashboard](screenshots/4-metricas.png)

### 📱 Aplicación Móvil

*(En desarrollo)*

---

## 🚀 Tech Stack

### Frontend Web
- **React 18.2** - Biblioteca de UI componente-based
- **Vite 5.0** - Build tool ultrarrápido con HMR
- **Tailwind CSS 3.3** - Framework CSS utility-first
- **Lucide React** - Iconos modernos y ligeros

### Mobile App
- **React Native 0.73** - Framework cross-platform para iOS/Android
- **Expo 50** - Plataforma de desarrollo React Native
- **Expo Go** - Cliente para testing rápido en dispositivos reales

### Machine Learning & Data Science
- **Python 3.x** - Lenguaje para entrenamiento del modelo
- **scikit-learn** - Implementación de Logistic Regression
- **pandas & numpy** - Manipulación y análisis de datos
- **matplotlib & seaborn** - Visualización de datos
- **joblib** - Serialización del modelo entrenado

### Dataset
- **UCI Heart Disease (Cleveland)** - 303 pacientes, 13 features clínicas

---

## 📦 Instalación

### Requisitos Previos

- **Node.js** 18.x o superior
- **npm** 9.x o superior
- **Python** 3.x (solo para entrenamiento del modelo)
- **Git**

### 🖥️ Instalación - Aplicación Web

```bash
# 1. Clonar el repositorio
git clone https://github.com/Skapsis/CardioCheck-Project.git
cd CardioCheck-Project

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# Por defecto: http://localhost:5173
```

### 📱 Instalación - Aplicación Móvil

```bash
# 1. Navegar al directorio mobile
cd mobile

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor Expo
npx expo start

# 4. Escanear código QR con Expo Go
# - Android: Descargar Expo Go desde Google Play
# - iOS: Descargar Expo Go desde App Store
```

**Testing en dispositivo físico:**
1. Instala **Expo Go** en tu smartphone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))
2. Ejecuta `npx expo start` en el directorio `mobile/`
3. Escanea el código QR con Expo Go (Android) o la app Cámara (iOS)
4. La app se cargará automáticamente en tu dispositivo

---

## 🌐 Despliegue

### Opción 1: GitHub Pages (Recomendado)

GitHub Pages permite hostear tu aplicación React gratuitamente con HTTPS.

**Paso 1: Instalar gh-pages**
```bash
npm install --save-dev gh-pages
```

**Paso 2: Configurar package.json**

Agrega la propiedad `homepage` y los scripts de deployment:

```json
{
  "name": "cardiocheck",
  "homepage": "https://Skapsis.github.io/CardioCheck-Project",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Paso 3: Configurar Vite**

Edita `vite.config.js` para establecer la ruta base:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CardioCheck-Project/' // Nombre de tu repositorio
})
```

**Paso 4: Desplegar**

```bash
# Construir y desplegar en GitHub Pages
npm run deploy
```

**Paso 5: Configurar GitHub**

1. Ve a tu repositorio en GitHub
2. `Settings > Pages`
3. En "Source", selecciona la rama `gh-pages`
4. Guarda los cambios
5. Espera 2-3 minutos y visita: `https://Skapsis.github.io/CardioCheck-Project`

---

### Opción 2: Vercel (Alternativa rápida)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Desplegar
vercel

# 3. Seguir las instrucciones interactivas
# Framework: Vite
# Build Command: npm run build
# Output Directory: dist
```

---

### Opción 3: Netlify

1. Arrastra la carpeta `dist/` (después de `npm run build`) a [netlify.com/drop](https://app.netlify.com/drop)
2. O conecta tu repositorio de GitHub desde el dashboard de Netlify
3. Configuración:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

---

## 🧠 Cómo Funciona el Modelo

CardioCheck utiliza un modelo de **Regresión Logística** entrenado con scikit-learn. El proceso es el siguiente:

### 1️⃣ Normalización (StandardScaler)

Cada característica se normaliza usando la media y desviación estándar del dataset:

```
normalized_value = (value - mean) / std
```

### 2️⃣ Cálculo del Score Lineal (z)

```
z = intercept + Σ(coefficient_i × normalized_value_i)
```

### 3️⃣ Función Sigmoide

Convierte el score lineal en probabilidad (0-1):

```
P = 1 / (1 + e^(-z))
```

### 4️⃣ Interpretación

- **P < 0.3** (< 30%): Riesgo Bajo ✅
- **0.3 ≤ P < 0.7** (30-70%): Riesgo Moderado ⚠️
- **P ≥ 0.7** (≥ 70%): Riesgo Alto 🚨

### 📊 Features Utilizadas (13 características)

| Feature | Descripción | Rango |
|---------|-------------|-------|
| `age` | Edad del paciente | 1-120 años |
| `sex` | Sexo biológico | 0=Femenino, 1=Masculino |
| `cp` | Tipo de dolor torácico | 0-3 |
| `trestbps` | Presión arterial en reposo | 80-220 mm Hg |
| `chol` | Colesterol sérico | 100-600 mg/dl |
| `fbs` | Glucosa en ayunas > 120 mg/dl | 0=No, 1=Sí |
| `restecg` | Resultados ECG en reposo | 0-2 |
| `thalach` | Frecuencia cardíaca máxima | 60-220 bpm |
| `exang` | Angina inducida por ejercicio | 0=No, 1=Sí |
| `oldpeak` | Depresión ST inducida | 0.0-6.2 |
| `slope` | Pendiente del segmento ST | 0-2 |
| `ca` | Vasos principales coloreados | 0-3 |
| `thal` | Talasemia | 0-3 |

---

## 🔧 Actualizar el Modelo

Si deseas reentrenar el modelo con nuevos datos:

1. **Ejecuta el notebook de Python**:
   ```bash
   jupyter notebook ConexionData.ipynb
   ```

2. **Entrena el modelo** ejecutando todas las celdas

3. **Copia los parámetros** de la sección "📦 FORMATO JSON"

4. **Actualiza los parámetros** en `src/App.jsx` (línea ~45):
   - `intercept`
   - `coefficients`
   - `scaler_mean`
   - `scaler_scale`

---

## 📁 Estructura del Proyecto

```
CardioCheck-Project/
├── src/
│   ├── components/
│   │   ├── Disclaimer.jsx       # Advertencia médica
│   │   ├── Header.jsx           # Cabecera de la app
│   │   ├── HeartRiskForm.jsx    # Formulario de entrada
│   │   └── ResultDisplay.jsx    # Visualización de resultados
│   ├── App.jsx                  # Componente principal con modelo ML
│   ├── main.jsx                 # Entry point
│   └── index.css                # Estilos globales + Tailwind
├── mobile/
│   ├── App.js                   # App móvil React Native
│   ├── app.json                 # Configuración Expo
│   ├── package.json             # Dependencias móvil
│   └── README.md                # Documentación móvil
├── screenshots/                 # Capturas de pantalla
│   ├── 1-aviso.png
│   ├── 2-formulario.png
│   ├── 3-resultado.png
│   └── 4-metricas.png
├── ConexionData.ipynb           # Notebook de entrenamiento
├── heart-disease.csv            # Dataset UCI
├── README.md                    # Este archivo
├── LICENSE                      # Licencia MIT
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. **Fork** el repositorio
2. Crea una **branch** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva característica'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### 💡 Ideas para Contribuir

- [ ] Agregar más features al modelo (datos adicionales)
- [ ] Implementar visualizaciones interactivas con D3.js o Chart.js
- [ ] Agregar soporte multi-idioma (i18n)
- [ ] Crear tests unitarios con Jest y React Testing Library
- [ ] Integrar con APIs de salud (Apple Health, Google Fit)
- [ ] Implementar historial de evaluaciones con LocalStorage
- [ ] Agregar dark mode

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

**Importante**: Incluye el siguiente disclaimer:

> Este software es solo para fines educativos y de investigación. No debe utilizarse como herramienta de diagnóstico médico. Consulta siempre a un profesional de la salud calificado.

---

## 👨‍💻 Autor

**Skapsis**

- GitHub: [@Skapsis](https://github.com/Skapsis)
- Proyecto: [CardioCheck-Project](https://github.com/Skapsis/CardioCheck-Project)

---

## 🙏 Agradecimientos

- **UCI Machine Learning Repository** - Por el Heart Disease Dataset
- **Cleveland Clinic Foundation** - Por los datos clínicos originales
- **scikit-learn** - Por la implementación de Logistic Regression
- **React** y **Tailwind CSS** - Por las herramientas de desarrollo modernas
- **Expo** - Por simplificar el desarrollo móvil

---

## 📚 Referencias

- [UCI Heart Disease Dataset](https://archive.ics.uci.edu/ml/datasets/heart+disease)
- [Logistic Regression - scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html)
- [StandardScaler Documentation](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html)
- [Cleveland Clinic - Heart Disease](https://my.clevelandclinic.org/health/diseases/16898-coronary-artery-disease)

---

<div align="center">

**⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub ⭐**

[![GitHub stars](https://img.shields.io/github/stars/Skapsis/CardioCheck-Project?style=social)](https://github.com/Skapsis/CardioCheck-Project)

Made with ❤️ and ☕ by [Skapsis](https://github.com/Skapsis)

</div>
