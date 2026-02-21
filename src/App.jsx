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
import { calculateHeartRisk } from './utils/mlService';

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
