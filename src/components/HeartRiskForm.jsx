import React, { useState } from 'react';
import { User, Heart, Activity, Droplet, BarChart3, Candy, Zap } from 'lucide-react';

const HeartRiskForm = ({ onCalculate, onReset, hasResult }) => {
  const [formData, setFormData] = useState({
    age: 50,
    sex: 'male',
    cp: 0,
    trestbps: 120,
    chol: 200,
    fbs: false,
    thalach: 150
  });
  
  // 🧪 FUNCIÓN DE PRUEBA: Cargar caso de ALTO RIESGO automáticamente
  const loadHighRiskCase = () => {
    // Basado en las MEDIAS REALES del dataset para target=1 (CON enfermedad)
    const highRiskData = {
      age: 60,
      sex: 'male',        // 1
      cp: 2,              // Dolor torácico atípico (1-3 indica síntomas)
      trestbps: 145,      // Presión arterial elevada
      chol: 250,          // Colesterol alto
      fbs: true,          // Glucosa alta (1)
      restecg: 1,         // Anormalidad ECG
      thalach: 160,       // Frecuencia cardíaca ALTA (target=1 tiene media 158)
      exang: false,       // Sin angina por ejercicio (0)
      oldpeak: 0.5,       // Depresión ST BAJA (target=1 tiene media 0.58)
      slope: 1,           // Pendiente plana
      ca: 0,              // Vasos coloreados BAJO (target=1 tiene media 0.36)
      thal: 2             // Defecto reversible
    };
    
    console.log('\n🧪 === CASO DE PRUEBA CARGADO: ALTO RIESGO ===');
    console.log('Datos de prueba:', highRiskData);
    console.log('✅ Basado en medias reales de target=1 (CON enfermedad)');
    console.log('Debería dar >50% de probabilidad de enfermedad.');
    
    setFormData(highRiskData);
  };
  
  // 🧪 FUNCIÓN DE PRUEBA: Cargar caso de BAJO RIESGO automáticamente
  const loadLowRiskCase = () => {
    // Basado en las MEDIAS REALES del dataset para target=0 (SIN enfermedad)
    const lowRiskData = {
      age: 50,
      sex: 'male',        // 1
      cp: 0,              // ASINTOMÁTICO (sin dolor torácico)
      trestbps: 125,      // Presión normal
      chol: 210,          // Colesterol normal
      fbs: false,         // Glucosa normal (0)
      restecg: 0,         // ECG normal
      thalach: 135,       // Frecuencia cardíaca BAJA (target=0 tiene media 139)
      exang: false,       // Sin angina por ejercicio (0)
      oldpeak: 1.8,       // Depresión ST ALTA (target=0 tiene media 1.59)
      slope: 1,           // Pendiente plana
      ca: 1,              // Vasos coloreados ALTO (target=0 tiene media 1.17)
      thal: 2             // Normal
    };
    
    console.log('\n🧪 === CASO DE PRUEBA CARGADO: BAJO RIESGO ===');
    console.log('Datos de prueba:', lowRiskData);
    console.log('✅ Basado en medias reales de target=0 (SIN enfermedad)');
    console.log('Debería dar <50% de probabilidad de enfermedad.');
    
    setFormData(lowRiskData);
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
    
    // Limpiar error del campo cuando el usuario lo modifica
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Edad debe estar entre 1 y 120 años';
    }
    
    if (formData.trestbps < 80 || formData.trestbps > 220) {
      newErrors.trestbps = 'Presión arterial debe estar entre 80 y 220 mm Hg';
    }
    
    if (formData.chol < 100 || formData.chol > 600) {
      newErrors.chol = 'Colesterol debe estar entre 100 y 600 mg/dl';
    }
    
    if (formData.thalach < 60 || formData.thalach > 220) {
      newErrors.thalach = 'Frecuencia cardíaca debe estar entre 60 y 220 bpm';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      age: 50,
      sex: 'male',
      cp: 0,
      trestbps: 120,
      chol: 200,
      fbs: false,
      thalach: 150
    });
    setErrors({});
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Edad */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <User className="w-4 h-4 text-clinical-blue" />
          Edad (años)
        </label>
        <div className="space-y-2">
          <input
            type="range"
            name="age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-clinical-blue">{formData.age}</span>
            <span className="text-xs text-gray-500">1-120 años</span>
          </div>
        </div>
        {errors.age && <p className="text-xs text-health-red mt-1">{errors.age}</p>}
      </div>

      {/* Sexo */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <User className="w-4 h-4 text-clinical-blue" />
          Sexo biológico
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, sex: 'male' }))}
            className={`py-3 px-4 rounded-lg font-medium transition-all ${
              formData.sex === 'male'
                ? 'bg-clinical-blue text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Masculino
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, sex: 'female' }))}
            className={`py-3 px-4 rounded-lg font-medium transition-all ${
              formData.sex === 'female'
                ? 'bg-clinical-blue text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Femenino
          </button>
        </div>
      </div>

      {/* Tipo de dolor en el pecho */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Heart className="w-4 h-4 text-clinical-blue" />
          Tipo de dolor torácico
        </label>
        <select
          name="cp"
          value={formData.cp}
          onChange={handleChange}
          className="input-field"
        >
          <option value={0}>Asintomático (sin dolor)</option>
          <option value={1}>Angina atípica</option>
          <option value={2}>Dolor no anginoso</option>
          <option value={3}>Angina típica</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Selecciona el tipo de molestia o dolor que experimentas
        </p>
      </div>

      {/* Presión arterial */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Droplet className="w-4 h-4 text-clinical-blue" />
          Presión arterial en reposo (mm Hg)
        </label>
        <div className="space-y-2">
          <input
            type="range"
            name="trestbps"
            min="80"
            max="220"
            value={formData.trestbps}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-clinical-blue">{formData.trestbps}</span>
            <span className="text-xs text-gray-500">80-220 mm Hg</span>
          </div>
        </div>
        {errors.trestbps && <p className="text-xs text-health-red mt-1">{errors.trestbps}</p>}
      </div>

      {/* Colesterol */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <BarChart3 className="w-4 h-4 text-clinical-blue" />
          Colesterol sérico (mg/dl)
        </label>
        <div className="space-y-2">
          <input
            type="range"
            name="chol"
            min="100"
            max="600"
            value={formData.chol}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-clinical-blue">{formData.chol}</span>
            <span className="text-xs text-gray-500">100-600 mg/dl</span>
          </div>
        </div>
        {errors.chol && <p className="text-xs text-health-red mt-1">{errors.chol}</p>}
      </div>

      {/* Azúcar en sangre en ayunas */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Candy className="w-4 h-4 text-clinical-blue" />
          Azúcar en sangre en ayunas
        </label>
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            name="fbs"
            checked={formData.fbs}
            onChange={handleChange}
            className="w-5 h-5 text-clinical-blue rounded focus:ring-clinical-blue"
          />
          <div>
            <span className="font-medium text-gray-700">Mayor a 120 mg/dl</span>
            <p className="text-xs text-gray-500">Marca si tu glucosa en ayunas supera este valor</p>
          </div>
        </label>
      </div>

      {/* Frecuencia cardíaca máxima */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Zap className="w-4 h-4 text-clinical-blue" />
          Frecuencia cardíaca máxima alcanzada (bpm)
        </label>
        <div className="space-y-2">
          <input
            type="range"
            name="thalach"
            min="60"
            max="220"
            value={formData.thalach}
            onChange={handleChange}
            className="w-full"
          />
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-clinical-blue">{formData.thalach}</span>
            <span className="text-xs text-gray-500">60-220 bpm</span>
          </div>
        </div>
        {errors.thalach && <p className="text-xs text-health-red mt-1">{errors.thalach}</p>}
      </div>

      {/* Botones de Prueba - DEBUG MODE */}
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-4">
        <p className="text-xs font-bold text-yellow-800 mb-2 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          🧪 MODO DEBUG: Casos de Prueba Rápida
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={loadHighRiskCase}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          >
            ⚠️ Cargar Alto Riesgo
          </button>
          <button
            type="button"
            onClick={loadLowRiskCase}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          >
            ✅ Cargar Bajo Riesgo
          </button>
        </div>
        <p className="text-xs text-yellow-700 mt-2">
          💡 Usa estos botones para probar con datos conocidos. Abre la consola (F12) para ver el diagnóstico completo.
        </p>
      </div>
      
      {/* Botones Principales */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <Activity className="w-5 h-5" />
          Calcular Riesgo
        </button>
        {hasResult && (
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            Reiniciar
          </button>
        )}
      </div>
    </form>
  );
};

export default HeartRiskForm;
