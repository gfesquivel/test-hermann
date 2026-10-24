/* ============================================================================
   CONFIGURACIÓN — Test de Herrmann en vivo
   Este es el ÚNICO archivo que necesitas editar.
   - firebase: bloque firebaseConfig de tu proyecto (Configuración del proyecto
     → General → Tus apps). databaseURL es la URL que muestra Realtime Database.
   - sesion: código de la clase; cámbialo para otra sección o semestre.
   ============================================================================ */
window.HERMANN_CONFIG = {

  firebase: {
    apiKey: "AIzaSyA53QvGatS7OQC0xoegMwK-avSItra5uS0",
    authDomain: "test-hermann-uandes.firebaseapp.com",
    databaseURL: "https://test-hermann-uandes-default-rtdb.firebaseio.com",
    projectId: "test-hermann-uandes",
    storageBucket: "test-hermann-uandes.firebasestorage.app",
    messagingSenderId: "196801386250",
    appId: "1:196801386250:web:ac37c1a1f5adcf86fb8cf3",
    measurementId: "G-4MEJ9YQ4HN"
  },

  // Código de la sesión (clase). Todos los resultados se guardan bajo este código.
  // Para una nueva sección o un nuevo semestre basta con cambiarlo aquí,
  // o abrir ambas páginas con ?s=OTRO-CODIGO en la URL (solo letras, números y guiones).
  sesion: "ADM5030-2026-2",

  // Textos que se muestran en pantalla
  curso: "Liderazgo y Gestión del Cambio",
  institucion: "Ingeniería Comercial · 5° año · Universidad de los Andes",
  profesor: "Prof. Gonzalo Esquivel",

  // Cómo aparece el nombre del alumno en la pantalla de la clase:
  // "inicial" → Ana R.   |   "completo" → Ana Rojas   |   "no" → Ana
  mostrarApellido: "inicial"
};
