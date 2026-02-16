import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b-4 border-clinical-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="w-10 h-10 text-clinical-blue fill-clinical-blue" />
              <Sparkles className="w-4 h-4 text-soft-green absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Cardio<span className="text-clinical-blue">Check</span>
              </h1>
              <p className="text-sm text-gray-600">Evaluación de Riesgo Cardiovascular</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-500">Basado en</p>
              <p className="text-sm font-semibold text-gray-700">UCI Heart Disease Dataset</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-clinical-blue to-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
