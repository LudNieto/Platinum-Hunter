import firebase from "firebase/app";
import 'firebase/auth'

// Inicio de sesión de usuario
const loginUser = () => {
  firebase.auth().singInWithPopup
};

