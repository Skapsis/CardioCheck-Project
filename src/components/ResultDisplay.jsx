import React from 'react';
import { Heart, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Minus, Activity, Target, Zap, Award, BarChart3, Brain } from 'lucide-react';

const ResultDisplay = ({ result, onReset }) => {
  const { percentage, level, message, recommendations } = result;
  
  const getRiskIcon = () => {
    if (level === 'low') return <CheckCircle className="w-12 h-12 text-soft-green" />;
    if (level === 'medium') return <Minus className="w-12 h-12 text-warning-orange" />;
    return <AlertCircle className="w-12 h-12 text-health-red" />;
  };
  
  const getRiskColor = () => {
    if (level === 'low') return 'from-green-500 to-soft-green';
    if (level === 'medium') return 'from-yellow-500 to-warning-orange';
    return 'from-red-500 to-health-red';
  };
  
  const getRiskBgColor = () => {
    if (level === 'low') return 'bg-green-50 border-soft-green';
    if (level === 'medium') return 'bg-yellow-50 border-warning-orange';
    return 'bg-red-50 border-health-red';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Resultado principal */}
      <div className={`card p-8 border-4 ${getRiskBgColor()}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 ${getRiskBgColor()} rounded-2xl`}>
              {getRiskIcon()}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Tu nivel de riesgo</p>
              <h3 className="text-2xl font-bold text-gray-800">{message}</h3>
            </div>
          </div>
        </div>
        
        {/* Barra de progreso circular */}
        <div className="relative pt-8 pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-40 h-40">
              {/* Círculo de fondo */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-200"
                />
                {/* Círculo de progreso */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className={`${level === 'low' ? 'text-soft-green' : level === 'medium' ? 'text-warning-orange' : 'text-health-red'}`} stopColor="currentColor" />
                    <stop offset="100%" className={`${level === 'low' ? 'text-green-400' : level === 'medium' ? 'text-yellow-400' : 'text-red-400'}`} stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Porcentaje en el centro */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${level === 'low' ? 'text-soft-green' : level === 'medium' ? 'text-warning-orange' : 'text-health-red'}`}>
                  {percentage}%
                </span>
                <span className="text-sm text-gray-600 mt-1">Riesgo</span>
              </div>
            </div>
          </div>
          
          {/* Escala de referencia */}
          <div className="flex justify-between text-xs text-gray-600 mt-4">
            <div className="text-center">
              <div className="w-3 h-3 bg-soft-green rounded-full mx-auto mb-1"></div>
              <span>0-30%<br/>Bajo</span>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-warning-orange rounded-full mx-auto mb-1"></div>
              <span>30-60%<br/>Moderado</span>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 bg-health-red rounded-full mx-auto mb-1"></div>
              <span>60-100%<br/>Alto</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recomendaciones */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-clinical-blue" />
          <h3 className="text-xl font-bold text-gray-800">Recomendaciones Personalizadas</h3>
        </div>
        
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className={`mt-1 flex-shrink-0 ${level === 'low' ? 'text-soft-green' : level === 'medium' ? 'text-warning-orange' : 'text-health-red'}`}>
                {level === 'low' ? '✓' : level === 'medium' ? '⚠' : '❗'}
              </span>
              <span className="text-sm text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Datos ingresados */}
      <div className="card p-6 bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">📋 Datos utilizados en la evaluación:</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-500 text-xs">Edad</p>
            <p className="font-semibold text-gray-800">{result.formData.age} años</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-500 text-xs">Sexo</p>
            <p className="font-semibold text-gray-800">{result.formData.sex === 'male' ? 'Masculino' : 'Femenino'}</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-500 text-xs">Presión arterial</p>
            <p className="font-semibold text-gray-800">{result.formData.trestbps} mm Hg</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-500 text-xs">Colesterol</p>
            <p className="font-semibold text-gray-800">{result.formData.chol} mg/dl</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-500 text-xs">Frecuencia cardíaca</p>
            <p className="font-semibold text-gray-800">{result.formData.thalach} bpm</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-500 text-xs">Glucosa en ayunas</p>
            <p className="font-semibold text-gray-800">{result.formData.fbs ? '> 120 mg/dl' : '≤ 120 mg/dl'}</p>
          </div>
        </div>
      </div>
      
      {/* Dashboard de Métricas del Modelo - DISEÑO PREMIUM */}
      {result.modelInfo && result.modelInfo.metrics && (
        <div className="card p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-2 border-clinical-blue border-opacity-20">
          {/* Header del Dashboard */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-clinical-blue to-blue-600 rounded-xl shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">Dashboard del Modelo</h3>
              <p className="text-sm text-gray-600">Métricas de rendimiento del algoritmo de Machine Learning</p>
            </div>
            <div className="hidden sm:block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-xs text-gray-500">Algoritmo</p>
              <p className="text-sm font-bold text-clinical-blue">{result.modelInfo.algorithm}</p>
            </div>
          </div>

          {/* Grid de Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Accuracy Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">Principal</span>
              </div>
              <p className="text-xs font-medium opacity-90 mb-1">Accuracy</p>
              <p className="text-3xl font-bold mb-2">{(result.modelInfo.metrics.accuracy * 100).toFixed(1)}%</p>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${result.modelInfo.metrics.accuracy * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Precision Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 shadow-lg text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">Precisión</span>
              </div>
              <p className="text-xs font-medium opacity-90 mb-1">Precision</p>
              <p className="text-3xl font-bold mb-2">{(result.modelInfo.metrics.precision * 100).toFixed(1)}%</p>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${result.modelInfo.metrics.precision * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Recall Card */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 shadow-lg text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">Sensibilidad</span>
              </div>
              <p className="text-xs font-medium opacity-90 mb-1">Recall</p>
              <p className="text-3xl font-bold mb-2">{(result.modelInfo.metrics.recall * 100).toFixed(1)}%</p>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${result.modelInfo.metrics.recall * 100}%` }}
                ></div>
              </div>
            </div>

            {/* F1-Score Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 shadow-lg text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">Balance</span>
              </div>
              <p className="text-xs font-medium opacity-90 mb-1">F1-Score</p>
              <p className="text-3xl font-bold mb-2">{(result.modelInfo.metrics.f1Score * 100).toFixed(1)}%</p>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${result.modelInfo.metrics.f1Score * 100}%` }}
                ></div>
              </div>
            </div>

            {/* AUC Card */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 shadow-lg text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">ROC</span>
              </div>
              <p className="text-xs font-medium opacity-90 mb-1">AUC-ROC</p>
              <p className="text-3xl font-bold mb-2">{(result.modelInfo.metrics.auc * 100).toFixed(1)}%</p>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${result.modelInfo.metrics.auc * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Cross-Validation Card */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-4 shadow-lg text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">5-Fold</span>
              </div>
              <p className="text-xs font-medium opacity-90 mb-1">CV Score</p>
              <p className="text-3xl font-bold mb-2">{(result.modelInfo.metrics.cvScore * 100).toFixed(1)}%</p>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${result.modelInfo.metrics.cvScore * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Predicción Actual */}
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${result.probability >= 0.5 ? 'bg-red-100' : 'bg-green-100'}`}>
                <TrendingUp className={`w-6 h-6 ${result.probability >= 0.5 ? 'text-health-red' : 'text-soft-green'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Predicción del Modelo para este paciente</p>
                <p className={`font-bold text-lg ${result.probability >= 0.5 ? 'text-health-red' : 'text-soft-green'}`}>
                  {result.modelInfo.note}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Probabilidad calculada: <span className="font-semibold">{(result.probability * 100).toFixed(2)}%</span>
                </p>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-3xl font-bold" style={{ 
                  color: result.probability >= 0.5 ? '#dc3545' : '#28a745' 
                }}>
                  {(result.probability * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-gray-500">Confianza</p>
              </div>
            </div>
          </div>

          {/* Leyenda de Métricas */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white bg-opacity-60 rounded-lg p-2">
              <p className="font-semibold text-gray-700">📊 Accuracy:</p>
              <p className="text-gray-600">Porcentaje de predicciones correctas</p>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-2">
              <p className="font-semibold text-gray-700">🎯 Precision:</p>
              <p className="text-gray-600">De los casos predichos positivos, % correctos</p>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-2">
              <p className="font-semibold text-gray-700">⚡ Recall:</p>
              <p className="text-gray-600">De todos los positivos reales, % detectados</p>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-2">
              <p className="font-semibold text-gray-700">🏆 F1-Score:</p>
              <p className="text-gray-600">Balance entre Precision y Recall</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Disclaimer de resultados */}
      <div className="card p-4 bg-blue-50 border border-blue-200">
        <p className="text-xs text-gray-600 text-center">
          ⚕️ Recuerda: Este resultado es una <strong>estimación educativa</strong>. 
          Consulta con un profesional de la salud para una evaluación médica completa.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
