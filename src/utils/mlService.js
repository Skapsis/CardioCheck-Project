// src/utils/mlService.js

// ========================================================================
// 🧠 ALGORITMO DE REGRESIÓN LOGÍSTICA - MODELO ENTRENADO EN PYTHON
// ========================================================================
// IMPORTANTE: Después de ejecutar el notebook Python, copia y pega aquí
// los coeficientes exactos del modelo entrenado.
// ========================================================================

export const calculateHeartRisk = (data) => {
  // ✅ PARÁMETROS REALES DEL MODELO ENTRENADO (de ConexionData.ipynb)
  // Modelo: Logistic Regression con StandardScaler
  // Features: 13 características del dataset UCI Heart Disease
  
  const modelParams = {
    // INTERCEPTO (bias) del modelo
    intercept: 0.13159523820583108,
    
    // COEFICIENTES (weights) por característica
    coefficients: {
      age: 0.017735892695205903,
      sex: -0.714030156797815,
      cp: 0.9377354404244739,
      trestbps: -0.2114365918793342,
      chol: -0.45921005774159007,
      fbs: -0.0636488598350697,
      restecg: 0.2354714500702065,
      thalach: 0.5396293104526307,
      exang: -0.47588301638238667,
      oldpeak: -0.5948186666294084,
      slope: 0.30786705297888317,
      ca: -0.5592027955256132,
      thal: -0.6215780683618345
    },
    
    // MEDIA (mean) para normalización StandardScaler
    scaler_mean: {
      age: 54.289256198347104,
      sex: 0.6818181818181818,
      cp: 0.9421487603305785,
      trestbps: 131.70661157024793,
      chol: 244.88429752066116,
      fbs: 0.14049586776859505,
      restecg: 0.5454545454545454,
      thalach: 150.12396694214877,
      exang: 0.33884297520661155,
      oldpeak: 1.0719008264462808,
      slope: 1.4132231404958677,
      ca: 0.743801652892562,
      thal: 2.3388429752066116
    },
    
    // DESVIACIÓN ESTÁNDAR (scale) para normalización StandardScaler
    scaler_scale: {
      age: 9.134385146726768,
      sex: 0.46577048936179993,
      cp: 1.0065695006747153,
      trestbps: 17.95726900188743,
      chol: 47.748426495236316,
      fbs: 0.3475007610186551,
      restecg: 0.5300865358950273,
      thalach: 21.9324923110465,
      exang: 0.4733163987859952,
      oldpeak: 1.2037629115359054,
      slope: 0.6188421805462159,
      ca: 1.0407318278586128,
      thal: 0.6037584625728556
    }
  };
  
  // ========================================================================
  // PASO 1: Preparar los datos del formulario
  // ========================================================================
  
  // 🔒 FORZAR CONVERSIÓN A NÚMEROS (prevenir strings de formularios HTML)
  // Para características no capturadas por el formulario, usamos valores por defecto
  // basados en las medias del dataset (para mantener compatibilidad)
  const features = {
    age: Number(data.age),
    sex: data.sex === 'male' ? 1 : 0,
    cp: Number(data.cp),
    trestbps: Number(data.trestbps),
    chol: Number(data.chol),
    fbs: data.fbs ? 1 : 0,
    restecg: data.restecg !== undefined ? Number(data.restecg) : Math.round(modelParams.scaler_mean.restecg),
    thalach: Number(data.thalach),
    exang: data.exang !== undefined ? (data.exang ? 1 : 0) : Math.round(modelParams.scaler_mean.exang),
    oldpeak: data.oldpeak !== undefined ? Number(data.oldpeak) : modelParams.scaler_mean.oldpeak,
    slope: data.slope !== undefined ? Number(data.slope) : Math.round(modelParams.scaler_mean.slope),
    ca: data.ca !== undefined ? Number(data.ca) : Math.round(modelParams.scaler_mean.ca),
    thal: data.thal !== undefined ? Number(data.thal) : Math.round(modelParams.scaler_mean.thal)
  };
  
  // ========================================================================
  // PASO 2: NORMALIZACIÓN (StandardScaler)
  // Formula: normalized = (value - mean) / scale
  // ========================================================================
  const normalizedFeatures = {};
  for (const [key, value] of Object.entries(features)) {
    if (modelParams.scaler_scale[key] !== undefined) {
      const mean = modelParams.scaler_mean[key];
      const scale = modelParams.scaler_scale[key];
      const normalized = (value - mean) / scale;
      normalizedFeatures[key] = normalized;
    }
  }
  
  // ========================================================================
  // PASO 3: CALCULAR SCORE LINEAL (z)
  // Formula: z = intercept + sum(coefficient_i * normalized_value_i)
  // ========================================================================
  let z = modelParams.intercept;
  
  for (const [key, normalizedValue] of Object.entries(normalizedFeatures)) {
    if (modelParams.coefficients[key] !== undefined) {
      const coefficient = modelParams.coefficients[key];
      const contribution = coefficient * normalizedValue;
      z += contribution;
    }
  }
  
  // ========================================================================
  // PASO 4: APLICAR FUNCIÓN SIGMOIDE
  // Formula: P = 1 / (1 + e^(-z))
  // Retorna probabilidad entre 0 y 1
  // ========================================================================
  const probability = 1 / (1 + Math.exp(-z));
  const riskPercentage = probability * 100;
  
  // ========================================================================
  // PASO 5: INTERPRETAR RESULTADOS
  // ========================================================================
  // El modelo predice: probability >= 0.5 = enfermedad presente
  //                    probability < 0.5  = sin enfermedad
  // ========================================================================

  let riskLevel = 'low';
  let riskColor = 'text-soft-green';
  let riskMessage = '';
  let recommendations = [];

  // Nota: Los umbrales se basan en la probabilidad del modelo
  // probability < 0.3 (30%) = Bajo riesgo
  // probability 0.3-0.7 (30-70%) = Riesgo moderado  
  // probability > 0.7 (70%) = Alto riesgo
  
  if (probability < 0.3) {
    riskLevel = 'low';
    riskColor = 'text-soft-green';
    riskMessage = 'Riesgo Bajo - Baja probabilidad de enfermedad cardiovascular';
    recommendations = [
      'El modelo indica baja probabilidad de enfermedad',
      'Mantén tu estilo de vida saludable actual',
      'Realiza actividad física regular (150 min/semana)',
      'Continúa con una dieta balanceada',
      'Revisiones médicas anuales preventivas'
    ];
  } else if (probability < 0.7) {
    riskLevel = 'medium';
    riskColor = 'text-warning-orange';
    riskMessage = 'Riesgo Moderado - Probabilidad intermedia detectada';
    recommendations = [
      'El modelo indica probabilidad moderada de enfermedad',
      '⚠️ Consulta con tu médico para evaluación detallada',
      'Considera estudios cardiovasculares complementarios',
      'Revisa tus hábitos alimenticios',
      'Aumenta la actividad física progresivamente',
      'Monitorea tu presión arterial regularmente',
      'Reduce el consumo de sal y grasas saturadas'
    ];
  } else {
    riskLevel = 'high';
    riskColor = 'text-health-red';
    riskMessage = 'Riesgo Alto - Alta probabilidad de enfermedad cardiovascular';
    recommendations = [
      '🚨 IMPORTANTE: El modelo indica alta probabilidad de enfermedad',
      '⚠️ Consulta a un cardiólogo lo antes posible',
      'Realiza estudios cardiovasculares completos urgentemente',
      'Este resultado requiere atención médica profesional',
      'No ignores este resultado - agenda una cita médica',
      'Considera programa de rehabilitación cardíaca',
      'Monitoreo continuo de signos vitales recomendado'
    ];
  }

  return {
    percentage: Math.round(riskPercentage),
    probability: probability,  // Incluir probabilidad raw para referencia
    level: riskLevel,
    color: riskColor,
    message: riskMessage,
    recommendations,
    formData: data,
    modelInfo: {
      algorithm: 'Logistic Regression',
      note: probability >= 0.5 
        ? 'El modelo predice presencia de enfermedad (p >= 0.5)' 
        : 'El modelo predice ausencia de enfermedad (p < 0.5)',
      // 📊 Métricas del modelo (actualizar con valores reales del notebook)
      metrics: {
        accuracy: 0.803,   // ← ACTUALIZAR con el valor del notebook
        precision: 0.769,  // ← ACTUALIZAR con el valor del notebook
        recall: 0.909,     // ← ACTUALIZAR con el valor del notebook
        f1Score: 0.833,    // ← ACTUALIZAR con el valor del notebook
        auc: 0.869,        // ← ACTUALIZAR con el valor del notebook
        cvScore: 0.831     // ← ACTUALIZAR con validación cruzada
      }
    }
  };
};
