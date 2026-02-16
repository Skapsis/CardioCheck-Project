# 📱 CardioCheck Mobile - React Native + Expo

Versión móvil nativa de CardioCheck para iOS y Android.

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18+ instalado
- **npm** o **yarn**
- **Expo Go** app en tu teléfono:
  - iOS: [Descargar de App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android: [Descargar de Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Instalación

```bash
# Navegar a la carpeta mobile
cd mobile

# Instalar dependencias
npm install
# o
yarn install
```

### Ejecutar la App

```bash
# Iniciar Expo
npm start
# o
npx expo start
```

Esto abrirá **Expo Dev Tools** en tu navegador y mostrará un **código QR**.

### Probar en tu Dispositivo

1. **iOS**: Abre la app **Camera** y escanea el código QR
2. **Android**: Abre la app **Expo Go** y escanea el código QR

La app se cargará en tu teléfono en segundos. ✨

---

## 📱 Características

- ✅ **100% Nativo**: Usa componentes nativos de React Native
- ✅ **Mismo Modelo ML**: Idéntica lógica matemática que la versión web
- ✅ **Offline-First**: No requiere conexión a internet
- ✅ **Validación en Tiempo Real**: Verifica los datos antes de calcular
- ✅ **UI Optimizada para Móvil**: Diseño touch-friendly
- ✅ **Soporte iOS y Android**: Una sola codebase
- ✅ **Disclaimer Educativo**: Aviso médico al inicio

---

## 🎨 Componentes Nativos Utilizados

- `<SafeAreaView>`: Respeta las áreas seguras (notch, bordes redondeados)
- `<ScrollView>`: Scroll nativo suave
- `<TextInput>`: Inputs nativos con teclado apropiado
- `<TouchableOpacity>`: Botones con feedback táctil
- `<Switch>`: Toggle nativo del sistema
- `<StatusBar>`: Barra de estado personalizada

---

## 📊 Estructura de la App

```javascript
App.js
├── MODEL_PARAMS           // Coeficientes del modelo ML
├── calculateHeartRisk()   // Función de regresión logística
├── Main Component
│   ├── Disclaimer Screen  // Pantalla de aviso inicial
│   ├── Form Screen        // Formulario de datos clínicos
│   └── Results Screen     // Resultados y recomendaciones
└── Styles                 // StyleSheet de React Native
```

---

## 🧮 Lógica del Modelo

La app móvil implementa **exactamente el mismo modelo** que la versión web:

### Paso 1: Normalización (StandardScaler)
```javascript
normalized = (value - mean) / scale
```

### Paso 2: Score Lineal
```javascript
z = intercept + Σ(coefficient_i × normalized_i)
```

### Paso 3: Función Sigmoide
```javascript
P = 1 / (1 + e^(-z))
```

**Resultado**: Probabilidad de 0% a 100%

---

## 🛠 Desarrollo

### Scripts Disponibles

```bash
npm start          # Inicia Expo Dev Server
npm run android    # Abre en emulador Android
npm run ios        # Abre en simulador iOS
npm run web        # Abre en navegador web
```

### Estructura de Archivos

```
mobile/
├── App.js           # Aplicación principal
├── package.json     # Dependencias
├── app.json         # Configuración de Expo
└── assets/          # Imágenes, íconos (crear si necesario)
```

---

## 🎨 Paleta de Colores

Mantiene la identidad visual de CardioCheck:

| Color | Hex | Uso |
|-------|------|-----|
| **Primary Blue** | `#3B82F6` | Header, botones principales |
| **Light Blue** | `#DBEAFE` | Backgrounds, info boxes |
| **Red** | `#DC2626` | Riesgo muy alto |
| **Orange** | `#F59E0B` | Riesgo alto |
| **Yellow** | `#FCD34D` | Riesgo moderado |
| **Green** | `#10B981` | Riesgo bajo |
| **Gray** | `#F8FAFC` | Fondo general |
| **Dark Gray** | `#1F2937` | Textos |

---

## 📦 Build para Producción

### Build para Android

```bash
# Build APK
npx expo build:android

# O usar EAS Build (recomendado)
npm install -g eas-cli
eas build --platform android
```

### Build para iOS

```bash
# Requiere cuenta de Apple Developer
eas build --platform ios
```

---

## 🧪 Testing

### Probar en Emuladores

**Android Studio Emulator**:
```bash
npm run android
```

**iOS Simulator** (solo macOS):
```bash
npm run ios
```

### Casos de Prueba

La app incluye validación automática:
- ✅ Edad: 1-120 años
- ✅ Presión arterial: 80-220 mm Hg
- ✅ Colesterol: 100-600 mg/dl
- ✅ Frecuencia cardíaca: 60-220 bpm

---

## 🐛Troubleshooting

### Error: "Metro bundler not starting"
```bash
npx expo start -c  # Clear cache
```

### Error: "Unable to resolve module"
```bash
rm -rf node_modules
npm install
```

### Error: QR code no funciona
- Asegúrate de estar en la misma red WiFi
- Intenta la opción "Tunnel" en Expo Dev Tools

---

## 📚 Recursos

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [StyleSheet API](https://reactnative.dev/docs/stylesheet)
- [React Native Components](https://reactnative.dev/docs/components-and-apis)

---

## ⚠️ Nota Importante

Esta aplicación es **exclusivamente educativa**:
- ❌ NO para uso clínico real
- ❌ NO sustituye diagnóstico médico
- ✅ Para aprendizaje de ML en móvil
- ✅ Para demostración de React Native

---

## 📄 Licencia

MIT License - Ver archivo LICENSE en la raíz del proyecto

---

<div align="center">

**Desarrollado con ❤️ usando React Native + Expo**

[⬆ Volver al README Principal](../README.md)

</div>
