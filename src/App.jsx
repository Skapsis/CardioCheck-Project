import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  User, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  Info,
  BarChart3,
  Droplet,
  Zap
} from 'lucide-react';
import HeartRiskForm from './components/HeartRiskForm';
import ResultDisplay from './components/ResultDisplay';
import Disclaimer from './components/Disclaimer';
import Header from './components/Header';

function App() {
  const [riskResult, setRiskResult] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleCalculateRisk = (formData) => {
    // Algoritmo de cálculo de riesgo basado en el dataset UCI Heart Disease
    const risk = calculateHeartRisk(formData);
    setRiskResult(risk);
  };

  const handleReset = () => {
    setRiskResult(null);
  };

  // ========================================================================
  // 🧠 ALGORITMO DE REGRESIÓN LOGÍSTICA - MODELO ENTRENADO EN PYTHON
  // ========================================================================
  // IMPORTANTE: Después de ejecutar el notebook Python, copia y pega aquí
  // los coeficientes exactos del modelo entrenado.
  // ========================================================================
  
  const calculateHeartRisk = (data) => {
    console.log('\n🚀 ================== INICIO DE CÁLCULO ==================');
    console.log('📥 Datos recibidos del formulario (RAW):', data);
    
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
    
    console.log('\n⚙️ Parámetros del modelo:');
    console.log('   Intercepto:', modelParams.intercept);
    console.log('   Coeficientes:', modelParams.coefficients);
    console.log('   Medias (scaler):', modelParams.scaler_mean);
    console.log('   Escalas (scaler):', modelParams.scaler_scale);
    
    // 🔍 VALIDACIÓN CRÍTICA: Verificar si los parámetros están actualizados
    const allCoefficientsZero = Object.values(modelParams.coefficients).every(c => c === 0.0);
    const allMeansZero = Object.values(modelParams.scaler_mean).every(m => m === 0.0);
    const allScalesOne = Object.values(modelParams.scaler_scale).every(s => s === 1.0);
    
    if (allCoefficientsZero || (allMeansZero && allScalesOne)) {
      console.error('\n❌ ¡ERROR CRÍTICO DETECTADO!');
      console.error('⚠️ Los parámetros del modelo NO han sido actualizados.');
      console.error('⚠️ Todos los coeficientes son 0.0 y/o scaler_mean=0.0 y scaler_scale=1.0');
      console.error('\n📋 SOLUCIÓN:');
      console.error('   1. Ejecuta TODAS las celdas del notebook: ConexionData.ipynb');
      console.error('   2. Busca la sección que dice: "📦 FORMATO JSON"');
      console.error('   3. Copia TODO el JSON completo');
      console.error('   4. Pega los valores en src/App.jsx línea ~45');
      console.error('   5. Reemplaza TODOS los 0.0 y 1.0 con los valores reales');
      console.error('\n💡 POR ESO SIEMPRE DA 50%: z=0 → sigmoid(0)=0.5=50%\n');
    }
    
    // ========================================================================
    // PASO 1: Preparar los datos del formulario + VALIDACIÓN DE TIPOS
    // ========================================================================
    console.log('\n📋 PASO 1: Preparación de datos');
    
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
    
    console.log('   Datos convertidos a números:', features);
    
    // 🔍 Verificar tipos de datos
    console.log('\n🔍 Verificación de tipos:');
    for (const [key, value] of Object.entries(features)) {
      const type = typeof value;
      const isValid = type === 'number' && !isNaN(value);
      console.log(`   ${key}: ${value} (${type}) ${isValid ? '✅' : '❌ INVÁLIDO!'}`);      
      if (!isValid) {
        console.error(`   ⚠️ ERROR: ${key} no es un número válido!`);
      }
    }
    
    // ========================================================================
    // PASO 2: NORMALIZACIÓN (StandardScaler)
    // Formula: normalized = (value - mean) / scale
    // ========================================================================
    console.log('\n📊 PASO 2: Normalización (StandardScaler)');
    
    const normalizedFeatures = {};
    for (const [key, value] of Object.entries(features)) {
      if (modelParams.scaler_scale[key] !== undefined) {
        const mean = modelParams.scaler_mean[key];
        const scale = modelParams.scaler_scale[key];
        const normalized = (value - mean) / scale;
        normalizedFeatures[key] = normalized;
        
        console.log(`   ${key}:`);
        console.log(`      Raw: ${value}`);
        console.log(`      Mean: ${mean}`);
        console.log(`      Scale: ${scale}`);
        console.log(`      Fórmula: (${value} - ${mean}) / ${scale}`);
        console.log(`      Normalizado: ${normalized.toFixed(6)}`);
      }
    }
    
    console.log('\n   📦 Features normalizados:', normalizedFeatures);
    
    // ========================================================================
    // PASO 3: CALCULAR SCORE LINEAL (z)
    // Formula: z = intercept + sum(coefficient_i * normalized_value_i)
    // ========================================================================
    console.log('\n🔢 PASO 3: Cálculo del score lineal (z)');
    console.log(`   Intercepto inicial: ${modelParams.intercept}`);
    
    let z = modelParams.intercept;
    console.log('\n   Contribuciones por característica:');
    
    for (const [key, normalizedValue] of Object.entries(normalizedFeatures)) {
      if (modelParams.coefficients[key] !== undefined) {
        const coefficient = modelParams.coefficients[key];
        const contribution = coefficient * normalizedValue;
        z += contribution;
        
        console.log(`   ${key}:`);
        console.log(`      Coeficiente: ${coefficient.toFixed(6)}`);
        console.log(`      Normalizado: ${normalizedValue.toFixed(6)}`);
        console.log(`      Multiplicación: ${coefficient.toFixed(6)} × ${normalizedValue.toFixed(6)} = ${contribution.toFixed(6)}`);
        console.log(`      z acumulado: ${z.toFixed(6)}`);
      }
    }
    
    console.log(`\n   📊 Score lineal FINAL (z): ${z}`);
    
    if (z === 0 || isNaN(z)) {
      console.error('\n❌ PROBLEMA DETECTADO:');
      console.error(`   z = ${z}`);
      if (z === 0) {
        console.error('   Si z=0, entonces sigmoid(0)=0.5, por eso siempre da 50%!');
        console.error('   Causa probable: Todos los coeficientes son 0.0');
      } else {
        console.error('   z es NaN! Hay un problema con los cálculos matemáticos.');
      }
    }
    
    // ========================================================================
    // PASO 4: APLICAR FUNCIÓN SIGMOIDE
    // Formula: P = 1 / (1 + e^(-z))
    // Retorna probabilidad entre 0 y 1
    // ========================================================================
    console.log('\n🎯 PASO 4: Aplicar función sigmoide');
    
    const expNegZ = Math.exp(-z);
    const denominator = 1 + expNegZ;
    const probability = 1 / denominator;
    
    console.log(`   Fórmula: P = 1 / (1 + e^(-z))`);
    console.log(`   e^(-${z.toFixed(6)}) = ${expNegZ.toFixed(6)}`);
    console.log(`   1 + e^(-z) = ${denominator.toFixed(6)}`);
    console.log(`   P = 1 / ${denominator.toFixed(6)} = ${probability.toFixed(6)}`);
    
    // Convertir probabilidad a porcentaje (0-100)
    let riskPercentage = probability * 100;
    
    console.log(`\n   ✨ Probabilidad FINAL: ${probability.toFixed(6)} (${riskPercentage.toFixed(2)}%)`);
    
    if (Math.abs(probability - 0.5) < 0.001) {
      console.warn('\n⚠️ ADVERTENCIA: La probabilidad está muy cerca de 50%!');
      console.warn('   Esto sugiere que z ≈ 0, revisa los parámetros del modelo.');
    }
    
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

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {showDisclaimer && (
          <Disclaimer onAccept={() => setShowDisclaimer(false)} />
        )}
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="card p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-clinical-blue bg-opacity-10 rounded-xl">
                  <Activity className="w-6 h-6 text-clinical-blue" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Evaluación de Riesgo</h2>
                  <p className="text-sm text-gray-600">Completa todos los campos para obtener tu resultado</p>
                </div>
              </div>
              
              <HeartRiskForm 
                onCalculate={handleCalculateRisk} 
                onReset={handleReset}
                hasResult={!!riskResult}
              />
            </div>
            
            {/* Información adicional */}
            <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-clinical-blue border-opacity-20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-clinical-blue mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-3 text-lg text-clinical-blue">🧠 ¿Cómo funciona esta herramienta?</p>
                  <p className="mb-3">
                    Esta evaluación utiliza un <strong>modelo de Regresión Logística real</strong> entrenado con Python/scikit-learn sobre el dataset UCI Heart Disease.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-lg text-xs space-y-1">
                    <p>✓ <strong>Normalización</strong> con StandardScaler</p>
                    <p>✓ <strong>Función Sigmoide</strong>: P = 1/(1 + e^(-z))</p>
                    <p>✓ <strong>7 características</strong> clínicas analizadas</p>
                    <p>✓ Dataset: <strong>UCI Cleveland Heart Disease</strong></p>
                  </div>
                  <p className="mt-3 text-xs text-gray-600 italic">
                    💡 Para actualizar el modelo: ejecuta <code className="bg-gray-200 px-1 rounded">ConexionData.ipynb</code> y copia los coeficientes al código.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resultados */}
          <div>
            {riskResult ? (
              <ResultDisplay result={riskResult} onReset={handleReset} />
            ) : (
              <div className="card p-12 h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Esperando datos clínicos
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Completa el formulario de evaluación para ver tu nivel de riesgo cardiovascular y recomendaciones personalizadas
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <Droplet className="w-6 h-6 text-clinical-blue mb-2" />
                    <p className="text-xs text-gray-600">Presión arterial</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                    <Zap className="w-6 h-6 text-soft-green mb-2" />
                    <p className="text-xs text-gray-600">Frecuencia cardíaca</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="text-xs text-gray-600">Colesterol</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                    <Activity className="w-6 h-6 text-warning-orange mb-2" />
                    <p className="text-xs text-gray-600">Evaluación completa</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-16 py-8 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © 2026 CardioCheck - Herramienta Educativa de Evaluación Cardiovascular
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Desarrollado con React, Tailwind CSS y datos del UCI Heart Disease Dataset
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
