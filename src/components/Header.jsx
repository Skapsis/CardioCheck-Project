import React from 'react';
import { Heart, Sparkles, Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-white via-blue-50 to-white shadow-neumorphic border-b-4 border-clinical-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-clinical-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white fill-white animate-pulse-slow" />
              </div>
              <Sparkles className="w-5 h-5 text-soft-green absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                Cardio<span className="text-clinical-blue">Check</span>
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Evaluación de Riesgo Cardiovascular con IA
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="bg-white px-5 py-3 rounded-xl shadow-card border border-gray-100">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-clinical-blue" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-medium">Powered by</p>
                  <p className="text-sm font-bold text-clinical-blue">Machine Learning</p>
                  <p className="text-xs text-gray-600">Logistic Regression Model</p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="bg-gradient-to-br from-soft-green to-green-600 text-white px-4 py-2 rounded-lg shadow-md">
                <p className="text-xs font-semibold">Dataset: UCI</p>
                <p className="text-sm font-bold">Heart Disease</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
