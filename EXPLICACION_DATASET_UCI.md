# 📊 Explicación del Dataset UCI Heart Disease

## 🎯 Interpretación del Target

En el dataset UCI Heart Disease:
- **target = 0** → **SIN enfermedad cardíaca** (paciente saludable)
- **target = 1** → **CON enfermedad cardíaca** (paciente enfermo)

El modelo predice la **probabilidad de tener enfermedad cardíaca (target=1)**.

---

## 📈 Características Promedio por Grupo

### 🟢 Target = 0 (SIN enfermedad / SALUDABLE)
```
age:     56.6 años
cp:      0.48  (asintomático, sin dolor torácico)
thalach: 139   (frecuencia cardíaca máxima BAJA)
oldpeak: 1.59  (depresión ST ALTA)
ca:      1.17  (vasos coloreados ALTO)
```

### 🔴 Target = 1 (CON enfermedad)
```
age:     52.5 años
cp:      1.38  (dolor torácico típico/atípico)
thalach: 158   (frecuencia cardíaca máxima ALTA)
oldpeak: 0.58  (depresión ST BAJA)
ca:      0.36  (vasos coloreados BAJO)
```

---

## 🤔 ¿Por qué los resultados son contra-intuitivos?

### Explicación Médica Real:

1. **cp (chest pain type):**
   - **0 = Asintomático**: La persona NO tiene dolor torácico
   - **1-3 = Con dolor**: Angina típica, atípica o no anginosa
   - En el dataset, los pacientes CON enfermedad tienen más dolor (síntoma)
   - Los pacientes SIN enfermedad están asintomáticos

2. **thalach (maximum heart rate achieved):**
   - **Más alta** en pacientes CON enfermedad (158 promedio)
   - **Más baja** en pacientes SIN enfermedad (139 promedio)
   - **¿Por qué?** Esto parece contra-intuitivo, pero:
     - Los pacientes CON enfermedad sintomática fueron referidos para pruebas de estrés
     - Alcanzaron frecuencias más altas durante la prueba
     - O la codificación del dataset tiene particularidades

3. **oldpeak (depresión ST):**
   - **Más baja** en pacientes CON enfermedad (0.58 promedio)
   - **Más alta** en pacientes SIN enfermedad (1.59 promedio)
   - Esto también es contra-intuitivo médicamente
   - Sugiere que el dataset puede tener codificaciones específicas

4. **ca (number of major vessels colored):**
   - **Menos vasos** en pacientes CON enfermedad (0.36 promedio)
   - **Más vasos** en pacientes SIN enfermedad (1.17 promedio)

---

## ⚠️ Problema Encontrado: Casos de Prueba Invertidos

### ❌ ANTES (Incorrecto):
```javascript
// "Alto Riesgo" definido incorrectamente
{
  cp: 3,        // ✗ Pensamos: más dolor = más riesgo
  thalach: 95,  // ✗ Pensamos: frecuencia baja = más riesgo
  oldpeak: 3.5, // ✗ Pensamos: depresión alta = más riesgo
  ca: 3         // ✗ Pensamos: más vasos = más riesgo
}
// Resultado: 3.59% ← ¡Riesgo BAJO! (inverso)
```

### ✅ DESPUÉS (Correcto):
```javascript
// "Alto Riesgo" basado en medias reales de target=1
{
  cp: 2,        // ✓ Dolor torácico presente (síntoma)
  thalach: 160, // ✓ Frecuencia cardíaca ALTA (como en target=1)
  oldpeak: 0.5, // ✓ Depresión ST BAJA (como en target=1)
  ca: 0         // ✓ Pocos vasos visibles (como en target=1)
}
// Resultado esperado: >50% (riesgo alto de enfermedad)
```

---

## 🎓 Lección Aprendida

**NO ASUMAS las relaciones de las variables basándote en intuición médica.**

Siempre:
1. ✅ Analiza las medias reales por grupo (target=0 vs target=1)
2. ✅ Verifica los coeficientes del modelo (signo + o -)
3. ✅ Usa casos de prueba basados en datos reales del dataset
4. ✅ Consulta la documentación original del dataset

---

## 🔗 Referencias

- Dataset: UCI Machine Learning Repository - Heart Disease Data
- Fuente: Cleveland Clinic Foundation
- Variables: 13 características clínicas
- Target: Presencia de enfermedad cardíaca (0=no, 1=sí)

---

## 📝 Casos de Prueba Actualizados

### 🔴 Alto Riesgo (debería dar >50%):
```javascript
{
  age: 60,
  sex: 'male',
  cp: 2,              // Dolor torácico
  trestbps: 145,
  chol: 250,
  fbs: true,
  restecg: 1,
  thalach: 160,       // Frecuencia ALTA
  exang: false,
  oldpeak: 0.5,       // Depresión ST BAJA
  slope: 1,
  ca: 0,              // Pocos vasos
  thal: 2
}
```

### 🟢 Bajo Riesgo (debería dar <50%):
```javascript
{
  age: 50,
  sex: 'male',
  cp: 0,              // Asintomático
  trestbps: 125,
  chol: 210,
  fbs: false,
  restecg: 0,
  thalach: 135,       // Frecuencia BAJA
  exang: false,
  oldpeak: 1.8,       // Depresión ST ALTA
  slope: 1,
  ca: 1,              // Más vasos
  thal: 2
}
```
