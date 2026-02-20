# 📱 CardioCheck Mobile - React Native + Expo

**Aplicación móvil nativa para evaluación de riesgo cardiovascular**

[![React Native](https://img.shields.io/badge/React%20Native-0.73-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50-000020?logo=expo)](https://expo.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://javascript.info/)

---

## 📋 **Descripción**

Versión móvil nativa de CardioCheck que utiliza el **mismo modelo de Machine Learning** que la versión web. Desarrollada con React Native y Expo para máxima compatibilidad cross-platform.

### ✨ **Características**
- 📱 **Nativo iOS/Android** con Expo
- 🧠 **Modelo ML Integrado** (sin backend)
- ⚡ **Evaluación Offline** instantánea  
- 🎨 **UI HealthTech** profesional
- 📊 **Resultados Visuales** con animaciones
- 🔒 **Sin datos enviados** (privacidad total)

---

## 🚀 **Instalación & Uso**

### **📋 Prerequisitos**
```bash
# Verificar Node.js
node --version  # Requiere v18+

# Instalar Expo CLI globalmente (opcional)
npm install -g @expo/cli
```

### **📥 Instalación**
```bash
# Navegar a carpeta mobile
cd mobile

# Instalar dependencias  
npm install

# Ejecutar aplicación
npx expo start
```

### **📲 Opciones de Ejecución**

#### **🔗 Con Expo Go (Recomendado)**
1. Instala **Expo Go** desde la App Store/Play Store
2. Ejecuta `npx expo start`
3. Escanea el **QR code** con tu cámara
4. ¡La app se abrirá automáticamente!

#### **📱 En Emulador** 
```bash
# Android Studio
npx expo start --android

# Xcode Simulator (solo macOS)
npx expo start --ios
```

#### **🌐 Desarrollo con Túnel**
```bash
# Para compartir con dispositivos remotos
npx expo start --tunnel
```

---

## 🏗️ **Arquitectura de la App**

### **📂 Estructura del Código**
```javascript
App.js
├── 🧠 MODEL_PARAMS           // Constantes del modelo ML
├── 🧮 calculateHeartRisk()  // Función de cálculo
├── 📱 App Component          // Componente principal
├── 🎨 StyleSheet            // Estilos nativos
└── ⚡ Estados & Lógica      // Gestión de formulario
```

### **🔧 Componentes Nativos Utilizados**
- `SafeAreaView` - Área segura multiplataforma
- `ScrollView` - Scroll nativo optimizado
- `TextInput` - Inputs nativos con teclado numérico
- `TouchableOpacity` - Botones con feedback táctil
- `Alert` - Alertas nativas del sistema

---

## 🧮 **Lógica del Modelo**

La app móvil implementa **exactamente el mismo modelo** que la versión web:

### **Constantes Integradas**
```javascript
const MODEL_PARAMS = {
  intercept: 0.13159523820583108,
  coefficients: { /* 13 coeficientes */ },  
  scaler_mean: { /* medias para normalización */ },
  scaler_scale: { /* escalas para normalización */ }
};
```

### **Proceso de Cálculo**
1. **Input** → Formulario nativo
2. **Validación** → Rangos clínicos  
3. **Normalización** → StandardScaler
4. **Score Lineal** → z = intercept + Σ(coef × norm_value)
5. **Sigmoide** → P = 1/(1 + e^(-z))
6. **Output** → Porcentaje + Nivel de riesgo

---

## 🎨 **Diseño & UX**

### **🎯 Principios de Diseño**
- **HealthTech**: Colores clínicos (azul #007bff)
- **Accesibilidad**: Textos legibles y contrastes apropiados  
- **Simplicidad**: Solo campos esenciales para el cálculo
- **Feedback**: Animaciones suaves y alertas claras

### **📊 Paleta de Colores**
```javascript
// Principales
Primary Blue:    #007bff   // Botones y encabezados
Success Green:   #28a745   // Riesgo bajo
Warning Orange:  #fd7e14   // Riesgo moderado  
Danger Red:      #dc3545   // Riesgo alto

// Neutros  
Background:      #f8f9fa   // Fondo general
Card White:      #ffffff   // Tarjetas y formularios
Text Dark:       #343a40   // Texto principal
Text Light:      #6c757d   // Texto secundario
```

---

## 🔧 **Scripts Disponibles**

```bash
# Desarrollo
npm start              # Alias de expo start
npx expo start         # Iniciar servidor de desarrollo
npx expo start --clear # Limpiar caché y reiniciar

# Builds
npx expo prebuild      # Generar carpetas nativas
npx expo run:ios       # Build y run iOS 
npx expo run:android   # Build y run Android

# EAS Build (producción)
npx eas build --platform ios     # Build iOS
npx eas build --platform android # Build Android
```

---

## 📦 **Dependencias**

### **Principales**
```json
{
  "expo": "^50.0.17",
  "react": "18.2.0", 
  "react-native": "0.73.6"
}
```

### **Iconos (Opcional)**
```json
{
  "@expo/vector-icons": "^13.0.0"  // Para íconos adicionales
}
```

---

## 🐛 **Troubleshooting**

### **❌ Problemas Comunes**

#### **"Metro bundler has encountered an error"**
```bash
# Limpiar caché Metro
npx expo start --clear
# O manualmente:
npx expo r -c
```

#### **"Network response timed out"**  
```bash
# Usar túnel si hay problemas de red
npx expo start --tunnel
```

#### **"Unable to resolve module"**
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

#### **Red Screen con errores de sintaxis**
- Verificar que no haya imports de librerías web (lucide-react, etc.)
- Asegurar que solo se usen componentes de react-native 
- Revisar que no haya elementos HTML (`<div>`, `<button>`)

---

## 🚀 **Deploy & Distribución**

### **📲 Para Testing (Expo Go)**
```bash
# Generar QR para compartir
npx expo start --tunnel
# Compartir el enlace exp:// generado
```

### **🏪 Para App Stores**
```bash
# Configurar EAS
npm install -g eas-cli
eas login

# Build para stores 
eas build --platform all
eas submit --platform ios
eas submit --platform android
```

---

## 📚 **Recursos Adicionales**

- 📖 **[Documentación Expo](https://docs.expo.dev/)**
- 📘 **[React Native Docs](https://reactnative.dev/docs/getting-started)**
- 🎓 **[Expo University](https://expo.dev/university)**  
- 💬 **[Expo Discord](https://chat.expo.dev/)**

---

## ⚖️ **Licencia & Disclaimer**

- **Licencia**: MIT (ver [LICENSE](../LICENSE))
- **Uso**: Solo fines educativos
- **Disclaimer**: No sustituye diagnóstico médico profesional

---

<div align="center">

**📱 Desarrollado con ❤️ para la salud cardiovascular móvil**

[⬆️ Volver al proyecto principal](../README.md)

</div>
