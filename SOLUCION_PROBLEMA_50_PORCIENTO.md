# 🔧 Solución: "La calculadora siempre da 50%"

## 🚨 Problema

Tu calculadora en React siempre devuelve **50%** de riesgo, sin importar los datos que ingreses.

---

## 🔍 Diagnóstico

Este problema ocurre cuando:

1. ✅ El modelo en Python fue entrenado **CON normalización** (StandardScaler)
2. ❌ El frontend en React está **SIN normalizar** los datos correctamente
3. ❌ Los valores de `scaler_mean` y `scaler_scale` están en **0.0** o **1.0** (valores por defecto)

### ¿Por qué da 50%?

```javascript
// Sin normalización correcta:
z = intercept + sum(coefficient × valor_crudo)  
// Con valores incorrectos, z ≈ 0

probability = 1 / (1 + e^(-0))  
// sigmoid(0) = 0.5 = 50%
```

---

## ✅ Solución paso a paso

### Paso 1: Ejecutar el Notebook Python

```bash
jupyter notebook ConexionData.ipynb
```

Ejecuta **TODAS las celdas** del notebook en orden.

### Paso 2: Copiar los Parámetros

Al final del notebook, verás una sección que dice:

```
📦 FORMATO JSON (copia directamente al código):
════════════════════════════════════════════════════════════════════════════════
{
  "intercept": -1.2345678901,
  "coefficients": {
    "age": 0.0123456789,
    "sex": 0.9876543210,
    ...
  },
  "scaler_mean": {
    "age": 54.3663366337,
    "sex": 0.6831683168,
    ...
  },
  "scaler_scale": {
    "age": 9.0820214305,
    "sex": 0.4657878873,
    ...
  }
}
```

**Copia TODO este JSON completo.**

### Paso 3: Actualizar el Frontend

1. Abre: `src/App.jsx`
2. Busca esta sección (línea ~45):

```javascript
const modelParams = {
  intercept: 0.0,  // ← ACTUALIZAR
  coefficients: {
    age: 0.0,      // ← ACTUALIZAR
    sex: 0.0,      // ← ACTUALIZAR
    ...
  },
  scaler_mean: {
    age: 0.0,      // ← ACTUALIZAR
    sex: 0.0,      // ← ACTUALIZAR
    ...
  },
  scaler_scale: {
    age: 1.0,      // ← ACTUALIZAR
    sex: 1.0,      // ← ACTUALIZAR
    ...
  }
};
```

3. **Reemplaza** cada `0.0` y `1.0` con los valores reales del JSON

### Ejemplo de actualización:

**ANTES (incorrecto - siempre da 50%):**
```javascript
const modelParams = {
  intercept: 0.0,
  coefficients: {
    age: 0.0,
    sex: 0.0,
  },
  scaler_mean: {
    age: 0.0,
    sex: 0.0,
  },
  scaler_scale: {
    age: 1.0,
    sex: 1.0,
  }
};
```

**DESPUÉS (correcto - usa valores reales del modelo):**
```javascript
const modelParams = {
  intercept: -1.2345678901,
  coefficients: {
    age: 0.0285643210,
    sex: 0.8765432109,
  },
  scaler_mean: {
    age: 54.3663366337,
    sex: 0.6831683168,
  },
  scaler_scale: {
    age: 9.0820214305,
    sex: 0.4657878873,
  }
};
```

---

## 🧪 Cómo verificar que funciona

Una vez actualizados los valores:

1. Guarda `App.jsx` (Ctrl+S)
2. Si el servidor está corriendo, se recargará automáticamente
3. Ingresa estos datos de prueba:

**Caso de Alto Riesgo:**
- Edad: 70
- Sexo: Masculino
- Tipo de dolor: Angina típica (3)
- Presión: 180 mm Hg
- Colesterol: 350 mg/dl
- Glucosa: > 120 mg/dl (Sí)
- Frecuencia: 100 bpm

**Resultado esperado:** 70-95% de riesgo

**Caso de Bajo Riesgo:**
- Edad: 30
- Sexo: Femenino
- Tipo de dolor: Asintomático (0)
- Presión: 110 mm Hg
- Colesterol: 180 mg/dl
- Glucosa: ≤ 120 mg/dl (No)
- Frecuencia: 180 bpm

**Resultado esperado:** 5-20% de riesgo

Si ves estos rangos diferentes, **¡la solución funcionó!** ✅

---

## 📐 La Matemática Correcta

Tu código React ahora debe seguir estos pasos:

```javascript
// 1. Normalizar cada característica
normalized_age = (age - scaler_mean.age) / scaler_scale.age
normalized_sex = (sex - scaler_mean.sex) / scaler_scale.sex
// ... para todas las características

// 2. Calcular score lineal
z = intercept + 
    (coefficients.age × normalized_age) +
    (coefficients.sex × normalized_sex) +
    // ... suma para todas las características

// 3. Aplicar sigmoide
probability = 1 / (1 + Math.exp(-z))

// 4. Convertir a porcentaje
riskPercentage = probability * 100
```

---

## ⚠️ Errores comunes

### ❌ Error 1: No actualizar TODOS los valores
```javascript
// INCORRECTO - faltan valores
scaler_mean: {
  age: 54.36,  // ✓ actualizado
  sex: 0.0,    // ✗ olvidaste este
}
```

### ❌ Error 2: Copiar solo algunos decimales
```javascript
// INCORRECTO - perdiste precisión
intercept: -1.23,  // ✗ solo 2 decimales

// CORRECTO - todos los decimales
intercept: -1.2345678901,  // ✓ 10 decimales
```

### ❌ Error 3: No reiniciar el servidor
Después de editar `App.jsx`:
```bash
# Si el servidor no se recarga automáticamente:
Ctrl+C  # Detener
npm run dev  # Reiniciar
```

---

## 🎯 Checklist de verificación

- [ ] Ejecuté **TODAS** las celdas del notebook Python
- [ ] Copié el **JSON completo** de la salida
- [ ] Actualicé el `intercept` en `src/App.jsx`
- [ ] Actualicé **TODOS** los valores en `coefficients`
- [ ] Actualicé **TODOS** los valores en `scaler_mean`
- [ ] Actualicé **TODOS** los valores en `scaler_scale`
- [ ] Guardé el archivo `App.jsx`
- [ ] El servidor de desarrollo se recargó
- [ ] Probé con datos de alto y bajo riesgo
- [ ] Los resultados **YA NO son siempre 50%**

---

## 📞 ¿Sigue sin funcionar?

Si después de seguir todos los pasos aún tienes problemas:

1. **Revisa la consola del navegador** (F12):
   - ¿Hay errores de JavaScript?
   - ¿Los valores se están calculando correctamente?

2. **Verifica el código de normalización** en `App.jsx` (líneas ~89-96):
   ```javascript
   // Debe ser exactamente así:
   normalizedFeatures[key] = 
     (value - modelParams.scaler_mean[key]) / modelParams.scaler_scale[key];
   ```

3. **Imprime valores intermedios** para debugging:
   ```javascript
   console.log('Datos crudos:', features);
   console.log('Datos normalizados:', normalizedFeatures);
   console.log('Score z:', z);
   console.log('Probabilidad:', probability);
   ```

---

## 📚 Recursos adicionales

- Ver: `INSTRUCCIONES_ACTUALIZACION.md` - Guía completa de actualización
- Ver: `VALORES_PRUEBA_EJEMPLO.md` - Valores ficticios para testing inicial
- Ver: `README.md` - Documentación general del proyecto

---

✨ **¡Listo!** Tu calculadora ahora usa el modelo real de Machine Learning con predicciones precisas.
