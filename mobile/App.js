import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  Alert,
  Switch
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// --- LÓGICA MATEMÁTICA (COEFICIENTES Y MEDIAS) ---
const MEANS = {
    age: 54.44, sex: 0.68, cp: 0.97, trestbps: 131.69, chol: 246.69,
    fbs: 0.15, restecg: 0.53, thalach: 149.61, exang: 0.33,
    oldpeak: 1.04, slope: 1.40, ca: 0.73, thal: 2.31
};

const SCALES = {
    age: 9.04, sex: 0.47, cp: 1.03, trestbps: 17.54, chol: 51.78,
    fbs: 0.36, restecg: 0.99, thalach: 22.88, exang: 0.47,
    oldpeak: 1.16, slope: 0.62, ca: 1.02, thal: 0.61
};

const COEFFICIENTS = {
    age: -0.015, sex: 1.5, cp: 0.5, trestbps: 0.3, chol: 0.2,
    fbs: -0.1, restecg: 0.2, thalach: -0.4, exang: 0.8,
    oldpeak: 0.6, slope: 0.4, ca: 1.2, thal: 1.1
};

const INTERCEPT = -1.5; 

export default function App() {
  const [formData, setFormData] = useState({
    age: '', sex: false, cp: '', trestbps: '', chol: '',
    fbs: false, restecg: '', thalach: '', exang: false,
    oldpeak: '', slope: '', ca: '', thal: ''
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const calculateRisk = () => {
    // 1. Validar que haya datos básicos
    if (!formData.age || !formData.trestbps || !formData.chol) {
      Alert.alert("Faltan datos", "Por favor completa los campos principales (Edad, Presión, Colesterol).");
      return;
    }

    // 2. Convertir y Normalizar
    let z = INTERCEPT;
    
    // Mapeo de inputs a valores numéricos
    const inputs = {
      age: parseFloat(formData.age) || MEANS.age,
      sex: formData.sex ? 1 : 0,
      cp: parseFloat(formData.cp) || 0,
      trestbps: parseFloat(formData.trestbps) || MEANS.trestbps,
      chol: parseFloat(formData.chol) || MEANS.chol,
      fbs: formData.fbs ? 1 : 0,
      restecg: parseFloat(formData.restecg) || 0,
      thalach: parseFloat(formData.thalach) || MEANS.thalach,
      exang: formData.exang ? 1 : 0,
      oldpeak: parseFloat(formData.oldpeak) || 0,
      slope: parseFloat(formData.slope) || 1,
      ca: parseFloat(formData.ca) || 0,
      thal: parseFloat(formData.thal) || 2
    };

    // Aplicar fórmula de Regresión Logística
    for (const [key, value] of Object.entries(inputs)) {
      if (MEANS[key] !== undefined) {
        const normalized = (value - MEANS[key]) / SCALES[key];
        z += normalized * COEFFICIENTS[key];
      }
    }

    // 3. Sigmoide
    const probability = 1 / (1 + Math.exp(-z));
    setResult(probability);
  };

  const clearForm = () => {
    setFormData({
      age: '', sex: false, cp: '', trestbps: '', chol: '',
      fbs: false, restecg: '', thalach: '', exang: false,
      oldpeak: '', slope: '', ca: '', thal: ''
    });
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.header}>
        <MaterialCommunityIcons name="heart-pulse" size={32} color="#dc3545" />
        <Text style={styles.headerTitle}>CardioCheck</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Resultado */}
        {result !== null && (
          <View style={[styles.resultCard, result > 0.5 ? styles.highRisk : styles.lowRisk]}>
            <Text style={styles.resultTitle}>Riesgo Calculado</Text>
            <Text style={styles.resultValue}>{(result * 100).toFixed(1)}%</Text>
            <Text style={styles.resultText}>
              {result > 0.5 ? "ALTO RIESGO DETECTADO" : "Bajo Riesgo Detectado"}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Datos del Paciente</Text>
        
        {/* Edad */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Edad</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. 55" 
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(v) => handleInputChange('age', v)}
          />
        </View>

        {/* Sexo y ExAng (Switches) */}
        <View style={styles.row}>
          <View style={styles.switchGroup}>
            <Text style={styles.label}>Sexo (H/M)</Text>
            <View style={styles.switchContainer}>
                <Text>{formData.sex ? "Masc" : "Fem"}</Text>
                <Switch value={formData.sex} onValueChange={(v) => handleInputChange('sex', v)} />
            </View>
          </View>
          <View style={styles.switchGroup}>
            <Text style={styles.label}>Angina (Ejercicio)</Text>
            <View style={styles.switchContainer}>
                <Text>{formData.exang ? "Sí" : "No"}</Text>
                <Switch value={formData.exang} onValueChange={(v) => handleInputChange('exang', v)} />
            </View>
          </View>
        </View>

        {/* Presión y Colesterol */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Presión (mm Hg)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="120" 
              keyboardType="numeric"
              value={formData.trestbps}
              onChangeText={(v) => handleInputChange('trestbps', v)}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Colesterol</Text>
            <TextInput 
              style={styles.input} 
              placeholder="200" 
              keyboardType="numeric"
              value={formData.chol}
              onChangeText={(v) => handleInputChange('chol', v)}
            />
          </View>
        </View>

        {/* Ritmo Cardíaco Max */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Frecuencia Cardíaca Máx (thalach)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="150" 
            keyboardType="numeric"
            value={formData.thalach}
            onChangeText={(v) => handleInputChange('thalach', v)}
          />
        </View>

        {/* Otros inputs simplificados para el demo */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Dolor de Pecho (CP 0-3)</Text>
            <TextInput style={styles.input} placeholder="0" keyboardType="numeric" value={formData.cp} onChangeText={(v)=>handleInputChange('cp',v)} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCalc} onPress={calculateRisk}>
            <Text style={styles.buttonText}>CALCULAR RIESGO</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonClear} onPress={clearForm}>
            <Text style={styles.buttonClearText}>Limpiar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  switchGroup: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonCalc: {
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonClear: {
    padding: 15,
    alignItems: 'center',
  },
  buttonClearText: {
    color: '#666',
    fontSize: 16,
  },
  resultCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
  },
  lowRisk: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  highRisk: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});