# CardioCheck - Cardiovascular Risk Assessment Platform

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)
![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-orange?logo=jupyter)
![License](https://img.shields.io/badge/license-MIT-green)

Plataforma completa para evaluación y predicción de riesgo de enfermedades cardíacas, combinando análisis de Machine Learning con una aplicación web interactiva moderna.

---

## Descripción

**CardioCheck** es una herramienta educativa integral que combina:

1. **Análisis de Machine Learning**: Notebook de Jupyter con análisis completo del dataset UCI Heart Disease
2. **Aplicación Web Interactiva**: SPA moderna construida con React para evaluación de riesgo en tiempo real

El proyecto demuestra el flujo completo desde el análisis de datos hasta la implementación de una solución web funcional.

---

## Características Principales

### Análisis de Machine Learning
- Modelo de Regresión Logística optimizado (Accuracy: 80.3%)
- Validación cruzada 5-fold (83.09% ± 4.09%)
- Visualizaciones profesionales (Matriz de confusión, Curva ROC, etc.)
- Análisis de importancia de características

### Aplicación Web
- Interfaz moderna con diseño HealthTech profesional
- Formulario interactivo con 7 parámetros clínicos
- Algoritmo de scoring basado en investigación médica
- Visualización de resultados con progreso circular animado
- Recomendaciones personalizadas según nivel de riesgo
- Completamente responsivo (móvil, tablet, desktop)

---

## Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/CardioCheck-Project.git
cd CardioCheck-Project

# Instalar dependencias
npm install

# Iniciar la aplicación
npm run dev

# Abrir http://localhost:3000
```

### Ejecutar Notebook de ML

```bash
# Instalar dependencias Python
pip install pandas numpy matplotlib scikit-learn jupyter

# Iniciar Jupyter
jupyter notebook ConexionData.ipynb
```

---

## Resultados del Modelo

| Métrica | Valor |
|---------|-------|
| **Accuracy** | 80.33% |
| **Precision** | 76.92% |
| **Recall** | 90.91% |
| **F1-Score** | 83.33% |
| **AUC-ROC** | 0.869 |
| **CV Score** | 83.09% ± 4.09% |

### Características Más Importantes
1. **cp** (Tipo de dolor torácico) - Coef: +0.938
2. **sex** (Sexo) - Coef: -0.714
3. **thal** (Talasemia) - Coef: -0.622
4. **oldpeak** (Depresión ST) - Coef: -0.595
5. **ca** (Vasos principales) - Coef: -0.559

---

## Tecnologías

**Frontend:** React 18 • Tailwind CSS 3.3 • Vite 5.0 • Lucide React

**Data Science:** Python 3.13 • Pandas • NumPy • Scikit-learn • Matplotlib • Jupyter

---

## Estructura del Proyecto

```
CardioCheck-Project/
├── src/                     # Código fuente React
│   ├── components/          # Componentes React
│   ├── App.jsx             # App principal
│   └── index.css           # Estilos
├── ConexionData.ipynb      # Análisis ML
├── heart-disease.csv       # Dataset UCI
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Uso

### Aplicación Web
1. Abre http://localhost:3000
2. Acepta el disclaimer educativo
3. Completa el formulario con datos clínicos
4. Haz clic en "Calcular Riesgo"
5. Revisa resultados y recomendaciones

### Parámetros Evaluados
- Edad (1-120 años)
- Sexo biológico
- Tipo de dolor torácico
- Presión arterial en reposo (80-220 mm Hg)
- Colesterol sérico (100-600 mg/dl)
- Azúcar en sangre en ayunas
- Frecuencia cardíaca máxima (60-220 bpm)

---

## Dataset

**UCI Machine Learning Repository - Heart Disease Dataset**
- **Fuente:** Cleveland Clinic Foundation
- **Registros:** 303 pacientes
- **Atributos:** 14 variables clínicas
- **Target:** Binario (presencia/ausencia de enfermedad)

---

## Disclaimer Importante

**Esta herramienta es EXCLUSIVAMENTE para fines educativos.**

- NO sustituye un diagnóstico médico profesional
- NO debe usarse para decisiones de tratamiento
- Los resultados son estimaciones educativas
- Consulta siempre con un médico especialista

---

## Contribuir

Las contribuciones son bienvenidas.

1. Fork el proyecto
2. Crea tu rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## Enlaces Útiles

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [UCI Heart Disease Dataset](https://archive.ics.uci.edu/ml/datasets/heart+disease)
- [Scikit-learn](https://scikit-learn.org/)

---

## Contacto

Si tienes preguntas o sugerencias, abre un [issue](https://github.com/TU_USUARIO/CardioCheck-Project/issues).

---

<div align="center">

**Si este proyecto te fue útil, considera darle una estrella en GitHub**

**Desarrollado para educación y aprendizaje**

© 2026 CardioCheck - Cardiovascular Risk Assessment Platform

</div>
