// config.js

// Importa las funciones necesarias para inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8e9SKwXH5EDAKQtQG6CLDRs-txlNDREo",
  authDomain: "diccionario-de-itnig.firebaseapp.com",
  projectId: "diccionario-de-itnig",
  storageBucket: "diccionario-de-itnig.appspot.com",
  messagingSenderId: "652446077013",
  appId: "1:652446077013:web:47a17bb46a3dda046384dc"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exporta la base de datos para usarla en otros archivos
export { db };
