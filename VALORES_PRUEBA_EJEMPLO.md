# 🧪 Valores de Prueba para Testing

Este archivo contiene valores de ejemplo para probar la aplicación **antes** de entrenar el modelo real.

⚠️ **IMPORTANTE**: Estos son valores ficticios para testing. Para usar el modelo real, sigue las instrucciones en `INSTRUCCIONES_ACTUALIZACION.md`

---

## 📋 Valores de Ejemplo para `src/App.jsx`

Puedes usar estos valores temporalmente para verificar que la aplicación funciona:

```javascript
const modelParams = {
  // INTERCEPTO (bias) del modelo - Ejemplo ficticio
  intercept: -0.5432109876,
  
  // COEFICIENTES (weights) por característica - Ejemplos ficticios
  coefficients: {
    age: 0.0285643210,      // Mayor edad → más riesgo
    sex: 0.8765432109,      // Masculino (1) → más riesgo
    cp: 0.9234567890,       // Angina típica → más riesgo
    trestbps: 0.0123456789, // Presión alta → más riesgo
    chol: 0.0098765432,     // Colesterol alto → más riesgo
    fbs: 0.3456789012,      // Glucosa alta → más riesgo
    thalach: -0.0234567890, // Frecuencia baja → más riesgo
  },
  
  // MEDIA (mean) para normalización - Ejemplos basados en dataset típico
  scaler_mean: {
    age: 54.5,
    sex: 0.68,
    cp: 0.96,
    trestbps: 131.6,
    chol: 246.7,
    fbs: 0.15,
    thalach: 149.6,
  },
  
  // DESVIACIÓN ESTÁNDAR (scale) - Ejemplos basados en dataset típico
  scaler_scale: {
    age: 9.1,
    sex: 0.47,
    cp: 1.03,
    trestbps: 17.5,
    chol: 51.8,
    fbs: 0.36,
    thalach: 22.9,
  }
};
```

---

## 🧪 Casos de Prueba Recomendados

### Caso 1: Paciente de Alto Riesgo
**Entrada:**
- Edad: 70 años
- Sexo: Masculino
- Tipo de dolor: Angina típica (3)
- Presión arterial: 180 mm Hg
- Colesterol: 350 mg/dl
- Glucosa en ayunas: Sí (>120)
- Frecuencia cardíaca máxima: 100 bpm

**Resultado Esperado:** Riesgo Alto (60-100%)

---

### Caso 2: Paciente de Bajo Riesgo
**Entrada:**
- Edad: 30 años
- Sexo: Femenino
- Tipo de dolor: Asintomático (0)
- Presión arterial: 110 mm Hg
- Colesterol: 180 mg/dl
- Glucosa en ayunas: No
- Frecuencia cardíaca máxima: 180 bpm

**Resultado Esperado:** Riesgo Bajo (0-30%)

---

### Caso 3: Paciente de Riesgo Moderado
**Entrada:**
- Edad: 55 años
- Sexo: Masculino
- Tipo de dolor: Angina atípica (1)
- Presión arterial: 140 mm Hg
- Colesterol: 250 mg/dl
- Glucosa en ayunas: No
- Frecuencia cardíaca máxima: 140 bpm

**Resultado Esperado:** Riesgo Moderado (30-60%)

---

## 📝 Cómo Usar Estos Valores

1. **Copia el bloque `modelParams`** de arriba
2. Abre `src/App.jsx`
3. Busca la sección con el comentario:
   ```javascript
   // ⚠️ PEGAR AQUÍ LOS PARÁMETROS GENERADOS POR EL NOTEBOOK PYTHON ⚠️
   ```
4. **Reemplaza** todo el objeto `modelParams` con los valores de prueba
5. Guarda el archivo
6. Ejecuta `npm run dev`
7. Prueba con los casos de prueba de arriba

---

## ⚠️ Limitaciones de los Valores de Prueba

Estos valores son **ficticios** y sirven solo para:
- ✅ Verificar que la aplicación funciona
- ✅ Testear la interfaz de usuario
- ✅ Comprobar que el flujo de datos es correcto
- ✅ Desarrollar y hacer debugging

**NO** sirven para:
- ❌ Hacer predicciones reales
- ❌ Evaluar riesgo cardiovascular real
- ❌ Producción o uso clínico

---

## 🚀 Siguiente Paso

Una vez que hayas verificado que la aplicación funciona con estos valores de prueba:

1. Ejecuta el notebook `ConexionData.ipynb`
2. Entrena el modelo real con tus datos
3. Copia los coeficientes reales
4. Reemplaza estos valores de prueba con los valores reales
5. Sigue las instrucciones en `INSTRUCCIONES_ACTUALIZACION.md`

---

## 🔍 Verificación

Con estos valores de prueba, la fórmula que se ejecuta es:

```
1. Normalizar cada input: (valor - mean) / scale
2. Calcular z: intercept + Σ(coefficient × normalized_value)
3. Aplicar sigmoide: P = 1 / (1 + e^(-z))
4. Multiplicar por 100 para obtener porcentaje
```

Ejemplo con edad = 70:
```
normalized_age = (70 - 54.5) / 9.1 = 1.703
contribution_age = 0.0285643210 × 1.703 = 0.0486
(más las contribuciones de las otras características...)
```

---

¿Listo para el modelo real? Ve a `INSTRUCCIONES_ACTUALIZACION.md` 🚀
