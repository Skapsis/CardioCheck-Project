# 🔍 Guía de Debugging: "Por qué siempre da 50%"

## ✅ Sistema de Debugging Activado

He agregado **logs detallados** en tu aplicación para rastrear exactamente dónde está el problema.

---

## 📋 Cómo usar el sistema de debugging

### Paso 1: Abrir la Consola del Navegador

```
1. Ejecuta: npm run dev
2. Abre la aplicación: http://localhost:5173
3. Presiona F12 (o Ctrl+Shift+I)
4. Ve a la pestaña "Console"
```

### Paso 2: Usar los Botones de Prueba

En el formulario ahora verás una **sección amarilla de DEBUG** con dos botones:

- 🔴 **Cargar Alto Riesgo** - Llena el formulario con datos que deberían dar 70-90%
- 🟢 **Cargar Bajo Riesgo** - Llena el formulario con datos que deberían dar 10-30%

**Haz clic en uno de estos botones** y luego en "Calcular Riesgo".

### Paso 3: Leer los Logs en la Consola

Verás una salida detallada como esta:

```
🚀 ================== INICIO DE CÁLCULO ==================
📥 Datos recibidos del formulario (RAW): {age: 70, sex: "male", cp: 3, ...}

⚙️ Parámetros del modelo:
   Intercepto: 0
   Coeficientes: {age: 0, sex: 0, cp: 0, ...}
   Medias (scaler): {age: 0, sex: 0, ...}
   Escalas (scaler): {age: 1, sex: 1, ...}

❌ ¡ERROR CRÍTICO DETECTADO!
⚠️ Los parámetros del modelo NO han sido actualizados.
⚠️ Todos los coeficientes son 0.0 y/o scaler_mean=0.0 y scaler_scale=1.0

📋 SOLUCIÓN:
   1. Ejecuta TODAS las celdas del notebook: ConexionData.ipynb
   2. Busca la sección que dice: "📦 FORMATO JSON"
   3. Copia TODO el JSON completo
   4. Pega los valores en src/App.jsx línea ~45
   5. Reemplaza TODOS los 0.0 y 1.0 con los valores reales

💡 POR ESO SIEMPRE DA 50%: z=0 → sigmoid(0)=0.5=50%
```

---

## 🔍 Interpretación de los Logs

### ✅ CASO 1: ERROR DETECTADO - Parámetros sin actualizar

Si ves este mensaje en rojo:

```
❌ ¡ERROR CRÍTICO DETECTADO!
⚠️ Los parámetros del modelo NO han sido actualizados.
```

**🎯 DIAGNÓSTICO:**
- Los valores de `modelParams` están en sus defaults (0.0 y 1.0)
- NO has copiado los coeficientes del notebook Python
- Por eso siempre da 50%

**✅ SOLUCIÓN:**
1. Ve al notebook: `ConexionData.ipynb`
2. Ejecuta **TODAS las celdas** (Cell → Run All)
3. Baja hasta encontrar este texto:

```
📦 FORMATO JSON (copia directamente al código):
════════════════════════════════════════════════════════════════════════════════
{
  "intercept": -1.2345678901,
  "coefficients": {
    "age": 0.0285643210,
    "sex": 0.8765432109,
    ...
  },
  "scaler_mean": {
    "age": 54.3663366337,
    ...
  },
  "scaler_scale": {
    "age": 9.0820214305,
    ...
  }
}
```

4. **Copia TODO ese JSON** (desde la `{` hasta la `}`)
5. Abre `src/App.jsx`
6. Busca la línea ~45: `const modelParams = {`
7. **Reemplaza cada 0.0 y 1.0** con los valores correspondientes del JSON

---

### 📊 CASO 2: Logs Detallados del Cálculo

Si los parámetros están correctos, verás esto:

```
📋 PASO 1: Preparación de datos
   Datos convertidos a números: {age: 70, sex: 1, cp: 3, ...}

🔍 Verificación de tipos:
   age: 70 (number) ✅
   sex: 1 (number) ✅
   cp: 3 (number) ✅
   trestbps: 180 (number) ✅
   chol: 350 (number) ✅
   fbs: 1 (number) ✅
   thalach: 95 (number) ✅
```

✅ Si todos tienen ✅ → Los datos están correctos

❌ Si alguno tiene ❌ → Hay un problema de conversión de tipos

---

```
📊 PASO 2: Normalización (StandardScaler)
   age:
      Raw: 70
      Mean: 54.366
      Scale: 9.082
      Fórmula: (70 - 54.366) / 9.082
      Normalizado: 1.720034
   sex:
      Raw: 1
      Mean: 0.683
      Scale: 0.466
      Fórmula: (1 - 0.683) / 0.466
      Normalizado: 0.680258
   ...
```

**Busca estos valores:**
- ✅ Los valores normalizados NO deben ser iguales a los raw
- ✅ Si `Mean` es diferente de 0.0 → BIEN
- ✅ Si `Scale` es diferente de 1.0 → BIEN
- ❌ Si `Normalizado = Raw` → Los parámetros del scaler están mal

---

```
🔢 PASO 3: Cálculo del score lineal (z)
   Intercepto inicial: -1.234567

   Contribuciones por característica:
   age:
      Coeficiente: 0.028564
      Normalizado: 1.720034
      Multiplicación: 0.028564 × 1.720034 = 0.049134
      z acumulado: -1.185433
   sex:
      Coeficiente: 0.876543
      Normalizado: 0.680258
      Multiplicación: 0.876543 × 0.680258 = 0.596253
      z acumulado: -0.589180
   ...

   📊 Score lineal FINAL (z): 2.456789
```

**Busca estos valores:**
- ✅ Si `z` es diferente de 0 → BIEN
- ✅ Si los coeficientes NO son 0.0 → BIEN
- ❌ Si `z = 0` → Por eso da 50%!
- ❌ Si `z = NaN` → Hay operaciones matemáticas inválidas

---

```
🎯 PASO 4: Aplicar función sigmoide
   Fórmula: P = 1 / (1 + e^(-z))
   e^(-2.456789) = 0.085643
   1 + e^(-z) = 1.085643
   P = 1 / 1.085643 = 0.921123

   ✨ Probabilidad FINAL: 0.921123 (92.11%)
```

**Busca estos valores:**
- ✅ Si `P ≠ 0.5` (50%) → El modelo funciona correctamente
- ❌ Si `P ≈ 0.5` (50%) → Vuelve a verificar los parámetros

---

## 🧪 Casos de Prueba Esperados

### Caso 1: Alto Riesgo
**Datos:**
- Edad: 70
- Sexo: Masculino (1)
- Dolor torácico: 3
- Presión: 180
- Colesterol: 350
- Glucosa: Sí (1)
- Frecuencia: 95

**Resultado esperado:**
- Probabilidad: **70-95%**
- Nivel: **Riesgo Alto**

Si da 50% → Los parámetros NO están actualizados

---

### Caso 2: Bajo Riesgo
**Datos:**
- Edad: 30
- Sexo: Femenino (0)
- Dolor torácico: 0
- Presión: 110
- Colesterol: 180
- Glucosa: No (0)
- Frecuencia: 180

**Resultado esperado:**
- Probabilidad: **5-25%**
- Nivel: **Riesgo Bajo**

Si da 50% → Los parámetros NO están actualizados

---

## 🔧 Solución Paso a Paso

### ❌ Si ves este error:

```
❌ ¡ERROR CRÍTICO DETECTADO!
⚠️ Los parámetros del modelo NO han sido actualizados.
```

**Sigue estos pasos EXACTAMENTE:**

#### 1. Ejecutar el Notebook

```bash
cd c:\Users\5493183\Desktop\test\CardioCheck-Project
jupyter notebook ConexionData.ipynb
```

En Jupyter:
- Click en **Cell** → **Run All**
- Espera a que todas las celdas terminen de ejecutarse
- Baja hasta el final del notebook

#### 2. Encontrar el JSON

Busca esta sección (casi al final):

```
📦 FORMATO JSON (copia directamente al código):
════════════════════════════════════════════════════════════════════════════════
{
  "intercept": -1.2345678901,
  ...
}
════════════════════════════════════════════════════════════════════════════════
```

#### 3. Copiar TODO el JSON

Selecciona desde la primera `{` hasta la última `}` y copia (Ctrl+C).

#### 4. Actualizar el Frontend

Abre: `src/App.jsx` (línea ~45)

**ANTES (incorrecto):**
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
    ...
  },
  scaler_scale: {
    age: 1.0,      // ← ACTUALIZAR
    ...
  }
};
```

**DESPUÉS (correcto):**
```javascript
const modelParams = {
  intercept: -1.2345678901,  // ✅ Valor real
  coefficients: {
    age: 0.0285643210,        // ✅ Valor real
    sex: 0.8765432109,        // ✅ Valor real
    ...
  },
  scaler_mean: {
    age: 54.3663366337,       // ✅ Valor real
    ...
  },
  scaler_scale: {
    age: 9.0820214305,        // ✅ Valor real
    ...
  }
};
```

#### 5. Guardar y Probar

1. Guarda el archivo (Ctrl+S)
2. El navegador se recargará automáticamente
3. Haz clic en "🔴 Cargar Alto Riesgo"
4. Haz clic en "Calcular Riesgo"
5. Abre la consola (F12)
6. Verifica que ahora **NO** aparezca el error crítico
7. Verifica que `z ≠ 0`
8. Verifica que la probabilidad **YA NO sea 50%**

---

## 📝 Checklist de Verificación

Usa este checklist para verificar cada paso:

- [ ] Ejecuté el notebook `ConexionData.ipynb` completamente
- [ ] Vi la sección "📦 FORMATO JSON" al final
- [ ] Copié TODO el JSON (desde `{` hasta `}`)
- [ ] Abrí `src/App.jsx` 
- [ ] Encontré la línea ~45: `const modelParams = {`
- [ ] Reemplacé **TODOS** los valores:
  - [ ] `intercept` (era 0.0)
  - [ ] Todos los valores en `coefficients` (eran 0.0)
  - [ ] Todos los valores en `scaler_mean` (eran 0.0)
  - [ ] Todos los valores en `scaler_scale` (eran 1.0)
- [ ] Guardé el archivo
- [ ] Probé con el botón "Cargar Alto Riesgo"
- [ ] Abrí la consola (F12) y vi los logs
- [ ] **YA NO** aparece el error crítico
- [ ] El valor de `z` es diferente de 0
- [ ] La probabilidad **YA NO** es 50%

---

## 🎯 Resultado Esperado

Con los parámetros correctos, la consola debería mostrar:

```
🚀 ================== INICIO DE CÁLCULO ==================
...

📊 Score lineal FINAL (z): 2.456789

🎯 PASO 4: Aplicar función sigmoide
   ✨ Probabilidad FINAL: 0.921123 (92.11%)
```

Y en la pantalla verás:

```
┌─────────────────────────────────┐
│  Riesgo Alto                    │
│  92%                            │
│                                 │
│  Alta probabilidad de           │
│  enfermedad cardiovascular      │
└─────────────────────────────────┘
```

**¡Ya NO será 50%!** 🎉

---

## ⚠️ Si sigue dando 50% después de actualizar

Si después de seguir TODOS los pasos anteriores aún da 50%:

1. **Verifica en la consola:**
   - ¿Sigue apareciendo el error crítico?
   - ¿El valor de `z` es 0?
   - ¿Los coeficientes son diferentes de 0.0?

2. **Comparte estos logs:**
   - Copia TODO el contenido de la consola
   - Muéstrame los valores de `modelParams`
   - Muéstrame el valor final de `z`

3. **Verifica que guardaste el archivo:**
   - A veces el archivo no se guarda
   - Presiona Ctrl+S nuevamente
   - Verifica que el servidor se haya recargado

---

## 📞 Próximo Paso

1. **Ejecuta la aplicación** con `npm run dev`
2. **Abre la consola** (F12)
3. **Haz clic** en "🔴 Cargar Alto Riesgo"
4. **Haz clic** en "Calcular Riesgo"
5. **Lee la consola** y dime qué ves

Si ves el error crítico → Sigue las instrucciones de la sección "Solución Paso a Paso"

Si NO ves el error pero sigue dando 50% → Comparte los logs completos de la consola

---

✨ **Con este sistema de debugging, encontraremos el problema en segundos!**
