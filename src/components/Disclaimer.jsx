import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const Disclaimer = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative transform transition-all">
        <button
          onClick={onAccept}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-warning-orange bg-opacity-10 rounded-xl flex-shrink-0">
            <AlertCircle className="w-8 h-8 text-warning-orange" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Aviso Importante - Uso Educativo
            </h2>
            <p className="text-sm text-gray-600">
              Por favor, lee esta información antes de continuar
            </p>
          </div>
        </div>
        
        <div className="space-y-4 mb-8 text-gray-700">
          <div className="bg-yellow-50 border-l-4 border-warning-orange p-4 rounded">
            <p className="font-semibold mb-2">⚠️ Esta herramienta es SOLO para fines educativos</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-warning-orange mt-1">•</span>
                <span><strong>No sustituye</strong> un diagnóstico médico profesional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning-orange mt-1">•</span>
                <span><strong>No debe usarse</strong> para tomar decisiones de tratamiento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning-orange mt-1">•</span>
                <span>Los resultados son <strong>estimaciones aproximadas</strong> basadas en algoritmos simplificados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning-orange mt-1">•</span>
                <span>Desarrollada con <strong>propósitos demostrativos y educativos</strong></span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-clinical-blue p-4 rounded">
            <p className="font-semibold mb-2">✓ Recomendaciones:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-clinical-blue mt-1">•</span>
                <span>Consulta siempre con un <strong>médico cardiólogo certificado</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-clinical-blue mt-1">•</span>
                <span>Realiza <strong>chequeos médicos regulares</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-clinical-blue mt-1">•</span>
                <span>Ante cualquier síntoma, busca <strong>atención médica inmediata</strong></span>
              </li>
            </ul>
          </div>
          
          <p className="text-xs text-gray-500 italic">
            Esta aplicación utiliza datos del UCI Machine Learning Repository (Heart Disease Dataset) 
            con fines exclusivamente educativos y de demostración técnica.
          </p>
        </div>
        
        <button
          onClick={onAccept}
          className="w-full btn-primary text-center"
        >
          Entiendo y acepto continuar
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
