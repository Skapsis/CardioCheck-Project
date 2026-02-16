import React from 'react';
import { Heart, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Minus } from 'lucide-react';

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
