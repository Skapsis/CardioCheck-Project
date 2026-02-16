/**
 * ============================================================================
 * CardioCheck Mobile - React Native + Expo
 * Cardiovascular Risk Assessment Application
 * ============================================================================
 * 
 * Features:
 * - Real Logistic Regression model (trained in Python)
 * - StandardScaler normalization
 * - Sigmoid function: P = 1/(1+e^(-z))
 * - Native UI components
 * - Offline-first (no backend required)
 * 
 * Author: Your Name
 * Version: 1.0.0
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';

// ============================================================================
// 🧠 ML MODEL PARAMETERS (from ConexionData.ipynb)
// ============================================================================
const MODEL_PARAMS = {
  intercept: 0.13159523820583108,
  
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

// ============================================================================
// 🧮 CALCULATE HEART RISK FUNCTION (Logistic Regression)
// ============================================================================
const calculateHeartRisk = (data) => {
  // Prepare features with default values for missing fields
  const features = {
    age: Number(data.age),
    sex: data.sex === 'male' ? 1 : 0,
    cp: Number(data.cp),
    trestbps: Number(data.trestbps),
    chol: Number(data.chol),
    fbs: data.fbs ? 1 : 0,
    restecg: data.restecg !== undefined ? Number(data.restecg) : Math.round(MODEL_PARAMS.scaler_mean.restecg),
    thalach: Number(data.thalach),
    exang: data.exang !== undefined ? (data.exang ? 1 : 0) : Math.round(MODEL_PARAMS.scaler_mean.exang),
    oldpeak: data.oldpeak !== undefined ? Number(data.oldpeak) : MODEL_PARAMS.scaler_mean.oldpeak,
    slope: data.slope !== undefined ? Number(data.slope) : Math.round(MODEL_PARAMS.scaler_mean.slope),
    ca: data.ca !== undefined ? Number(data.ca) : Math.round(MODEL_PARAMS.scaler_mean.ca),
    thal: data.thal !== undefined ? Number(data.thal) : Math.round(MODEL_PARAMS.scaler_mean.thal)
  };

  // Step 1: Normalize features (StandardScaler)
  const normalizedFeatures = {};
  for (const [key, value] of Object.entries(features)) {
    const mean = MODEL_PARAMS.scaler_mean[key];
    const scale = MODEL_PARAMS.scaler_scale[key];
    normalizedFeatures[key] = (value - mean) / scale;
  }

  // Step 2: Calculate linear score (z)
  let z = MODEL_PARAMS.intercept;
  for (const [key, normalizedValue] of Object.entries(normalizedFeatures)) {
    const coefficient = MODEL_PARAMS.coefficients[key];
    z += coefficient * normalizedValue;
  }

  // Step 3: Apply sigmoid function
  const probability = 1 / (1 + Math.exp(-z));
  const percentage = probability * 100;

  // Step 4: Interpret results
  let riskLevel = '';
  let riskColor = '';
  let recommendations = [];

  if (percentage >= 75) {
    riskLevel = 'MUY ALTO';
    riskColor = '#DC2626';
    recommendations = [
      '🚨 Consulta médica URGENTE',
      '📋 Exámenes cardiológicos completos',
      '💊 Evaluación de medicamentos',
      '🏃 Plan de actividad bajo supervisión'
    ];
  } else if (percentage >= 50) {
    riskLevel = 'ALTO';
    riskColor = '#F59E0B';
    recommendations = [
      '🩺 Consulta con cardiólogo',
      '📊 Monitoreo de presión arterial',
      '🥗 Dieta balanceada',
      '🚶 Actividad física moderada'
    ];
  } else if (percentage >= 25) {
    riskLevel = 'MODERADO';
    riskColor = '#FCD34D';
    recommendations = [
      '✅ Chequeos médicos regulares',
      '🥦 Dieta saludable',
      '💪 Ejercicio regular',
      '😴 Buen descanso'
    ];
  } else {
    riskLevel = 'BAJO';
    riskColor = '#10B981';
    recommendations = [
      '✨ Mantén hábitos saludables',
      '🏃 Ejercicio regular',
      '🥗 Alimentación balanceada',
      '😊 Control de estrés'
    ];
  }

  return {
    probability: percentage,
    riskLevel,
    riskColor,
    recommendations,
    modelInfo: {
      accuracy: 80.3,
      precision: 76.9,
      recall: 90.9,
      f1Score: 83.3
    }
  };
};

// ============================================================================
// 📱 MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [formData, setFormData] = useState({
    age: '50',
    sex: 'male',
    cp: '0',
    trestbps: '120',
    chol: '200',
    fbs: false,
    thalach: '150'
  });

  const [result, setResult] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Handle input changes
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validate inputs
  const validateForm = () => {
    const age = Number(formData.age);
    const trestbps = Number(formData.trestbps);
    const chol = Number(formData.chol);
    const thalach = Number(formData.thalach);

    if (age < 1 || age > 120) {
      Alert.alert('Error', 'Edad debe estar entre 1 y 120 años');
      return false;
    }
    if (trestbps < 80 || trestbps > 220) {
      Alert.alert('Error', 'Presión arterial debe estar entre 80 y 220 mm Hg');
      return false;
    }
    if (chol < 100 || chol > 600) {
      Alert.alert('Error', 'Colesterol debe estar entre 100 y 600 mg/dl');
      return false;
    }
    if (thalach < 60 || thalach > 220) {
      Alert.alert('Error', 'Frecuencia cardíaca debe estar entre 60 y 220 bpm');
      return false;
    }

    return true;
  };

  // Calculate risk
  const handleCalculate = () => {
    if (validateForm()) {
      const riskData = calculateHeartRisk(formData);
      setResult(riskData);
      setShowDisclaimer(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setResult(null);
    setFormData({
      age: '50',
      sex: 'male',
      cp: '0',
      trestbps: '120',
      chol: '200',
      fbs: false,
      thalach: '150'
    });
  };

  // ============================================================================
  // 🎨 RENDER DISCLAIMER
  // ============================================================================
  if (showDisclaimer) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>⚠️ Aviso Importante</Text>
          <Text style={styles.disclaimerText}>
            Esta aplicación es EXCLUSIVAMENTE para fines educativos y de demostración.
          </Text>
          <Text style={styles.disclaimerText}>
            ❌ NO sustituye un diagnóstico médico profesional
          </Text>
          <Text style={styles.disclaimerText}>
            ❌ NO debe usarse para decisiones de tratamiento
          </Text>
          <Text style={styles.disclaimerText}>
            ✅ Consulta siempre con un médico especialista
          </Text>
          
          <TouchableOpacity
            style={styles.disclaimerButton}
            onPress={() => setShowDisclaimer(false)}
          >
            <Text style={styles.disclaimerButtonText}>Entiendo, Continuar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // 🎨 RENDER MAIN APP
  // ============================================================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🫀 CardioCheck</Text>
        <Text style={styles.headerSubtitle}>Evaluación de Riesgo Cardiovascular</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {!result ? (
          // ============================================================================
          // 📝 FORM VIEW
          // ============================================================================
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Datos del Paciente</Text>

            {/* Age */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Edad (años)</Text>
              <TextInput
                style={styles.input}
                value={formData.age}
                onChangeText={(value) => updateField('age', value)}
                keyboardType="numeric"
                placeholder="Ej: 50"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Sex */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sexo Biológico</Text>
              <View style={styles.segmentedControl}>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    formData.sex === 'male' && styles.segmentButtonActive
                  ]}
                  onPress={() => updateField('sex', 'male')}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      formData.sex === 'male' && styles.segmentTextActive
                    ]}
                  >
                    Masculino
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    formData.sex === 'female' && styles.segmentButtonActive
                  ]}
                  onPress={() => updateField('sex', 'female')}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      formData.sex === 'female' && styles.segmentTextActive
                    ]}
                  >
                    Femenino
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Chest Pain Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Dolor Torácico</Text>
              <View style={styles.selectContainer}>
                {['0 - Asintomático', '1 - Angina Típica', '2 - Angina Atípica', '3 - No Anginoso'].map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.selectOption,
                      formData.cp === String(index) && styles.selectOptionActive
                    ]}
                    onPress={() => updateField('cp', String(index))}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        formData.cp === String(index) && styles.selectTextActive
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Blood Pressure */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Presión Arterial en Reposo (mm Hg)</Text>
              <TextInput
                style={styles.input}
                value={formData.trestbps}
                onChangeText={(value) => updateField('trestbps', value)}
                keyboardType="numeric"
                placeholder="Ej: 120"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Cholesterol */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Colesterol Sérico (mg/dl)</Text>
              <TextInput
                style={styles.input}
                value={formData.chol}
                onChangeText={(value) => updateField('chol', value)}
                keyboardType="numeric"
                placeholder="Ej: 200"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Fasting Blood Sugar */}
            <View style={styles.inputGroup}>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Azúcar en Sangre en Ayunas {'>'} 120 mg/dl</Text>
                <Switch
                  value={formData.fbs}
                  onValueChange={(value) => updateField('fbs', value)}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                  thumbColor={formData.fbs ? '#fff' : '#f4f3f4'}
                />
              </View>
            </View>

            {/* Max Heart Rate */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Frecuencia Cardíaca Máxima (bpm)</Text>
              <TextInput
                style={styles.input}
                value={formData.thalach}
                onChangeText={(value) => updateField('thalach', value)}
                keyboardType="numeric"
                placeholder="Ej: 150"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Calculate Button */}
            <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
              <Text style={styles.calculateButtonText}>🔍 Calcular Riesgo</Text>
            </TouchableOpacity>

            {/* Disclaimer */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ℹ️ Esta herramienta usa un modelo de Machine Learning entrenado en el dataset UCI Heart Disease.
              </Text>
            </View>
          </View>
        ) : (
          // ============================================================================
          // 📊 RESULTS VIEW
          // ============================================================================
          <View style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>Resultados del Análisis</Text>

            {/* Risk Circle */}
            <View style={styles.riskCircle}>
              <Text style={[styles.riskPercentage, { color: result.riskColor }]}>
                {result.probability.toFixed(1)}%
              </Text>
              <Text style={[styles.riskLabel, { color: result.riskColor }]}>
                {result.riskLevel}
              </Text>
            </View>

            {/* Recommendations */}
            <View style={styles.recommendationsCard}>
              <Text style={styles.recommendationsTitle}>📋 Recomendaciones</Text>
              {result.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>

            {/* Model Info */}
            <View style={styles.modelInfoCard}>
              <Text style={styles.modelInfoTitle}>🤖 Información del Modelo</Text>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Accuracy:</Text>
                <Text style={styles.metricValue}>{result.modelInfo.accuracy}%</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Precision:</Text>
                <Text style={styles.metricValue}>{result.modelInfo.precision}%</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>Recall:</Text>
                <Text style={styles.metricValue}>{result.modelInfo.recall}%</Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={styles.metricLabel}>F1-Score:</Text>
                <Text style={styles.metricValue}>{result.modelInfo.f1Score}%</Text>
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>🔄 Nueva Evaluación</Text>
            </TouchableOpacity>

            {/* Warning */}
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Recuerda: Este resultado es educativo. Consulta a un médico para diagnóstico real.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
// 🎨 STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#3B82F6',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#DBEAFE',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  resultsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentButtonActive: {
    backgroundColor: '#3B82F6',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  selectContainer: {
    gap: 8,
  },
  selectOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectOptionActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  selectText: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calculateButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 18,
  },
  riskCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  riskPercentage: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  riskLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  recommendationsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  recommendationItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  recommendationText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  modelInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  modelInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
  },
  warningText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
  disclaimerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  disclaimerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 24,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 24,
    textAlign: 'center',
  },
  disclaimerButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  disclaimerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
