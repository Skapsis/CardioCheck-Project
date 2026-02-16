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

  // Algoritmo de regresión logística simulada con pesos basados en estudios médicos
  const calculateHeartRisk = (data) => {
    let score = 0;
    const weights = {
      age: 0.02,
      sex: 15,
      cp: 25,
      trestbps: 0.15,
      chol: 0.08,
      fbs: 10,
      thalach: 0.1
    };

    // Edad: Mayor edad = mayor riesgo
    score += (data.age - 20) * weights.age;

    // Sexo: Hombres tienen mayor riesgo
    if (data.sex === 'male') {
      score += weights.sex;
    }

    // Tipo de dolor en el pecho (cp - chest pain type)
    // 0: Asintomático (menor riesgo)
    // 1: Angina atípica
    // 2: Dolor no anginoso  
    // 3: Angina típica (mayor riesgo)
    const cpScores = { 0: 0, 1: 10, 2: 15, 3: 25 };
    score += cpScores[data.cp] || 0;

    // Presión arterial en reposo (trestbps)
    if (data.trestbps > 140) {
      score += (data.trestbps - 140) * weights.trestbps;
    }

    // Colesterol sérico (chol)
    if (data.chol > 200) {
      score += (data.chol - 200) * weights.chol;
    }

    // Azúcar en sangre en ayunas > 120 mg/dl (fbs)
    if (data.fbs) {
      score += weights.fbs;
    }

    // Frecuencia cardíaca máxima alcanzada (thalach)
    // Menor frecuencia cardíaca máxima puede indicar problemas
    if (data.thalach < 140) {
      score += (140 - data.thalach) * weights.thalach;
    }

    // Normalizar el score a un porcentaje (0-100)
    let riskPercentage = Math.min(Math.max(score, 0), 100);

    // Determinar nivel de riesgo
    let riskLevel = 'low';
    let riskColor = 'text-soft-green';
    let riskMessage = '';
    let recommendations = [];

    if (riskPercentage < 30) {
      riskLevel = 'low';
      riskColor = 'text-soft-green';
      riskMessage = 'Riesgo Bajo - Excelente condición cardiovascular';
      recommendations = [
        'Mantén tu estilo de vida saludable actual',
        'Realiza actividad física regular (150 min/semana)',
        'Continúa con una dieta balanceada',
        'Revisiones médicas anuales preventivas'
      ];
    } else if (riskPercentage < 60) {
      riskLevel = 'medium';
      riskColor = 'text-warning-orange';
      riskMessage = 'Riesgo Moderado - Atención preventiva recomendada';
      recommendations = [
        'Consulta con tu médico para evaluación detallada',
        'Considera modificar hábitos alimenticios',
        'Aumenta la actividad física progresivamente',
        'Monitorea tu presión arterial regularmente',
        'Reduce el consumo de sal y grasas saturadas'
      ];
    } else {
      riskLevel = 'high';
      riskColor = 'text-health-red';
      riskMessage = 'Riesgo Alto - Consulta médica urgente recomendada';
      recommendations = [
        '⚠️ IMPORTANTE: Consulta a un cardiólogo pronto',
        'Realiza estudios cardiovasculares completos',
        'Revisa y ajusta medicación con tu médico',
        'Implementa cambios inmediatos en tu estilo de vida',
        'Monitoreo continuo de signos vitales',
        'Considera programa de rehabilitación cardíaca'
      ];
    }

    return {
      percentage: Math.round(riskPercentage),
      level: riskLevel,
      color: riskColor,
      message: riskMessage,
      recommendations,
      formData: data
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
            <div className="card p-6 bg-blue-50 border border-blue-100">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-clinical-blue mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">¿Cómo funciona esta herramienta?</p>
                  <p>Esta evaluación utiliza un algoritmo basado en el dataset UCI Heart Disease, considerando factores como edad, presión arterial, colesterol y otros indicadores clínicos para estimar el riesgo cardiovascular.</p>
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
