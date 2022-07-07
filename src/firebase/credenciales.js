// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyBxcIK9GmkP05V49s_Yc0TIHvHXiDaBIMI",
  authDomain: "discord-clone-aae32.firebaseapp.com",
  projectId: "discord-clone-aae32",
  storageBucket: "discord-clone-aae32.appspot.com",
  messagingSenderId: "551509052693",
  appId: "1:551509052693:web:93ddaee6b6e39941802d1c"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
