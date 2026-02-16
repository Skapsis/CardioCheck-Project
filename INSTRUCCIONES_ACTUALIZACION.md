# 🔄 Instrucciones para Actualizar el Modelo

Este documento explica cómo sincronizar el modelo de Machine Learning entrenado en Python con el frontend React.

---

## 📋 Pasos a Seguir

### 1️⃣ Entrenar el Modelo en Python

1. Abre el archivo `ConexionData.ipynb` en Jupyter Notebook o VS Code
2. Ejecuta **todas las celdas** en orden secuencial (de arriba hacia abajo)
3. Espera a que termine el entrenamiento y todas las visualizaciones

### 2️⃣ Copiar los Parámetros del Modelo

Al final del notebook, encontrarás una celda que imprime:

```
📦 FORMATO JSON (copia directamente al código):
════════════════════════════════════════════════════════════════════════════════
{
  "intercept": -1.2345678901,
  "coefficients": {
    "age": 0.0123456789,
    "sex": 0.9876543210,
    "cp": 1.2345678901,
    "trestbps": -0.1234567890,
    "chol": 0.0987654321,
    "fbs": 0.1111111111,
    "thalach": -0.2222222222
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
════════════════════════════════════════════════════════════════════════════════
```

**Copia TODO este bloque JSON** (desde la `{` inicial hasta la `}` final)

### 3️⃣ Actualizar el Frontend

1. Abre el archivo: `src/App.jsx`

2. Busca la sección con este comentario:
   ```javascript
   // ⚠️ PEGAR AQUÍ LOS PARÁMETROS GENERADOS POR EL NOTEBOOK PYTHON ⚠️
   ```

3. Encontrarás una estructura como esta:
   ```javascript
   const modelParams = {
     intercept: 0.0,  // ← ACTUALIZAR con el valor del notebook
     coefficients: {
       age: 0.0,       // ← ACTUALIZAR
       sex: 0.0,       // ← ACTUALIZAR
       ...
     },
     ...
   };
   ```

4. Reemplaza **cada valor `0.0`** con los valores correspondientes del JSON que copiaste:
   - Copia el `intercept`
   - Para cada campo en `coefficients`, copia su valor correspondiente
   - Para cada campo en `scaler_mean`, copia su valor correspondiente
   - Para cada campo en `scaler_scale`, copia su valor correspondiente

### 4️⃣ Ejemplo de Actualización

**ANTES (valores por defecto):**
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

**DESPUÉS (con valores reales del modelo):**
```javascript
const modelParams = {
  intercept: -1.2345678901,
  coefficients: {
    age: 0.0123456789,
    sex: 0.9876543210,
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

### 5️⃣ Guardar y Verificar

1. Guarda el archivo `src/App.jsx` (Ctrl+S)
2. Si el servidor de desarrollo está corriendo, se recargará automáticamente
3. Si no está corriendo, ejecuta: `npm run dev`
4. Abre la aplicación en el navegador: `http://localhost:5173`
5. Prueba el formulario con algunos datos
6. Ahora los resultados utilizarán el **modelo real** de Machine Learning

---

## ⚠️ Notas Importantes

- **Precisión**: Copia los números con **todos sus decimales** para mantener la precisión del modelo
- **Todos los valores**: Asegúrate de actualizar **TODOS** los campos, no solo algunos
- **Orden**: El orden de las características en el JSON debe coincidir con el orden en `modelParams`
- **Reiniciar**: Si los resultados no cambian, reinicia el servidor de desarrollo

---

## 🧪 Cómo Probar que Funciona

1. **Caso de prueba de alto riesgo:**
   - Edad: 70
   - Sexo: Masculino
   - Tipo de dolor: Angina típica (3)
   - Presión: 180
   - Colesterol: 350
   - Glucosa en ayunas: Sí (>120)
   - Frecuencia cardíaca: 100

2. **Caso de prueba de bajo riesgo:**
   - Edad: 30
   - Sexo: Femenino
   - Tipo de dolor: Asintomático (0)
   - Presión: 110
   - Colesterol: 180
   - Glucosa en ayunas: No
   - Frecuencia cardíaca: 170

Si el modelo está correctamente sincronizado, deberías ver:
- **Caso 1**: Riesgo Alto (70-100%)
- **Caso 2**: Riesgo Bajo (0-30%)

---

## 🔧 Solución de Problemas

### Problema: "Los resultados siempre dan 50%"
**Solución**: No has actualizado los coeficientes. Todos están en `0.0`.

### Problema: "Error en la consola del navegador"
**Solución**: Verifica que copiaste correctamente los valores numéricos (no falta coma, paréntesis, etc.)

### Problema: "Los resultados parecen aleatorios"
**Solución**: Verifica que las claves en `modelParams` coincidan exactamente con las del notebook (age, sex, cp, etc.)

---

## 📦 Archivos Generados por el Notebook

El notebook también genera estos archivos automáticamente:

- `heart_disease_model_YYYYMMDD_HHMMSS.joblib` - Modelo completo (para usar en Python)
- `heart_disease_model_YYYYMMDD_HHMMSS.pkl` - Modelo completo (formato alternativo)
- `model_parameters_YYYYMMDD_HHMMSS.json` - Parámetros en JSON (referencia)

Puedes consultar el archivo `.json` generado si necesitas verificar los valores.

---

## ✅ Checklist de Verificación

- [ ] Ejecuté todas las celdas del notebook
- [ ] Copié el JSON completo de la última celda
- [ ] Actualicé el `intercept` en `src/App.jsx`
- [ ] Actualicé todos los valores en `coefficients`
- [ ] Actualicé todos los valores en `scaler_mean`
- [ ] Actualicé todos los valores en `scaler_scale`
- [ ] Guardé el archivo `src/App.jsx`
- [ ] Reinicié el servidor de desarrollo
- [ ] Probé el formulario con datos de prueba
- [ ] Los resultados son coherentes con el modelo

---

¿Necesitas ayuda? Revisa el archivo `README.md` o los comentarios en `src/App.jsx` para más detalles.
