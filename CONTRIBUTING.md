# 🤝 Contribuyendo a CardioCheck

¡Gracias por tu interés en contribuir a CardioCheck! Este proyecto es educativo y busca demostrar la implementación de Machine Learning en aplicaciones web y móviles.

---

## 📋 **Formas de Contribuir**

### 🐛 **Reportar Bugs**
- Usa el [Issue Template](https://github.com/tu-usuario/CardioCheck-Project/issues)
- Incluye pasos para reproducir el error
- Menciona navegador/dispositivo y versión

### 💡 **Sugerir Features**
- Propón nuevas características educativas
- Mejoras en la UI/UX
- Optimizaciones del modelo ML

### 🔧 **Pull Requests**
- Fork del repositorio
- Crea una rama feature: `git checkout -b feature/nueva-caracteristica`
- Commits claros: `git commit -m "Agrega: nueva característica"`
- Push y crea PR

---

## 🛠️ **Configuración de Desarrollo**

### **Requisitos**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### **Setup Inicial**
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/CardioCheck-Project.git
cd CardioCheck-Project

# Instalar dependencias web
npm install

# Setup móvil
cd mobile
npm install
cd ..

# Ejecutar desarrollo
npm run dev  # Versión web
cd mobile && npx expo start  # Versión móvil
```

---

## 📝 **Estándares de Código**

### **JavaScript/JSX**
```javascript
// ✅ Buenas prácticas
const calculateRisk = (inputs) => {
  const { age, cholesterol } = inputs;
  return processData(age, cholesterol);
};

// ❌ Evitar
function calc(a,c){return a*c}
```

### **Comentarios**
```javascript
// ✅ Comentarios útiles
// Normalización usando StandardScaler: (x - mean) / scale
const normalized = (value - mean) / scale;

// ❌ Comentarios obvios  
const age = 35; // Asignar edad
```

### **Estructura de Archivos**
```
src/
├── components/          # Componentes React
│   ├── Header.jsx      # Header principal
│   └── forms/          # Formularios
├── utils/              # Funciones auxiliares
├── constants/          # Constantes del modelo ML  
└── styles/            # CSS modules
```

---

## 🧮 **Modelo de Machine Learning**

### **⚠️ Constantes Críticas**
```javascript
// 🔒 NO MODIFICAR - Entrenado con datos específicos
const MODEL_PARAMS = {
  intercept: 0.13159523820583108,
  coefficients: { /* valores exactos */ },
  scaler_mean: { /* medias del dataset */ },
  scaler_scale: { /* escalas del dataset */ }
};
```

### **✅ Áreas Modificables**
- Validación de inputs
- Interfaz de usuario
- Presentación de resultados
- Animaciones y UX

---

## 📱 **Desarrollo Móvil (React Native)**

### **Componentes Permitidos**
```javascript
// ✅ Solo componentes nativos
import { View, Text, ScrollView, TextInput } from 'react-native';

// ❌ NO usar librerías web
import { Button } from 'react-bootstrap'; // Error
```

### **Testing Móvil**
```bash
# Expo Go (recomendado)
npx expo start
# Escanear QR con dispositivo

# Emuladores  
npx expo start --android  # Android Studio
npx expo start --ios      # Xcode (macOS only)
```

---

## 🧪 **Testing & Calidad**

### **Casos de Prueba Esenciales**
```javascript
// Validación de entrada
testInput('age', 45, true);      // ✅ Válido
testInput('age', 200, false);    // ❌ Inválido

// Cálculo del modelo
testModelOutput({
  age: 63, sex: 1, cp: 3, 
  trestbps: 145, chol: 233
}, 0.8523); // Resultado esperado ~85%
```

### **Valores de Prueba**
```javascript
// 🔬 Casos extremos para testing
const TEST_CASES = {
  lowRisk: { age: 25, chol: 180, ... },    // ~10% risk
  highRisk: { age: 70, chol: 350, ... },   // ~90% risk  
  boundary: { age: 120, chol: 600, ... }   // Límites
};
```

---

## 📚 **Documentación**

### **README Updates**
```markdown
<!-- ✅ Mantener estructura -->
## 🚀 Características
## 📊 Tecnologías
## 🧮 Modelo ML
## 🛠️ Instalación

<!-- ❌ No duplicar info entre README.md y mobile/README.md -->
```

### **Comentarios de Código**
```javascript
/**
 * Calcula el riesgo cardiovascular usando regresión logística
 * @param {Object} inputs - Datos clínicos del paciente
 * @param {number} inputs.age - Edad (años)
 * @param {number} inputs.chol - Colesterol (mg/dl)  
 * @returns {number} Probabilidad de riesgo (0-1)
 */
```

---

## 🎯 **Prioridades del Proyecto**

### **Alta Prioridad**
1. 🧠 **Precisión del Modelo**: Mantener constantes ML exactas
2. 📱 **Compatibilidad Móvil**: React Native sin dependencias problemáticas  
3. 🎨 **UX Médica**: Interfaz clara y profesional
4. 📚 **Documentación**: README completo y actualizado

### **Media Prioridad**
1. ⚡ **Performance**: Optimizar cálculos y renderizado
2. 🔍 **Testing**: Casos de prueba automatizados
3. 🌐 **Accesibilidad**: WCAG compliance
4. 🎨 **Diseño**: Mejoras visuales

### **Baja Prioridad**
1. 📊 **Analytics**: Métricas de uso (anonimizadas)
2. 🌍 **i18n**: Múltiples idiomas
3. 🔔 **PWA**: Service workers, offline
4. 🎯 **SEO**: Metadatos optimizados

---

## ⚖️ **Consideraciones Éticas**

### **🚫 Limitaciones Importantes**
- ❌ **NO es un dispositivo médico**
- ❌ **NO para diagnóstico real**
- ✅ **Solo fines educativos**
- ✅ **Disclaimer visible siempre**

### **🔒 Privacidad**
- Sin envío de datos a servidores
- Cálculos locales únicamente  
- Sin cookies de tracking
- Sin almacenamiento persistente de datos médicos

---

## 📧 **Contacto & Soporte**

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/CardioCheck-Project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tu-usuario/CardioCheck-Project/discussions)
- **Email**: tu-email@dominio.com

---

## 📄 **Licencia**

Al contribuir, aceptas que tu código se licence bajo MIT License.

---

<div align="center">

**¡Gracias por ayudar a mejorar la educación en salud cardiovascular! ❤️**

</div>