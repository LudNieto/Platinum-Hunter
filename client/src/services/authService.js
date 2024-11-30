import firebase from '../config/firebase';
import { db } from '../config/firebase';

// Inicio de sesión de usuario
const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  const user = result.user;

  const userDoc = await db.collection('users').doc(user.uid).get();

  if (!userDoc.exists) {
    await registerUserInDatabase(user);
  }

  return result;
};

const loginWithEmailPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const registerUserInDatabase = (user) => {
  return db.collection('users').doc(user.uid).set({
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

const signUpWithEmailPassword = async (email, password) => {
  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await registerUserInDatabase(userCredential.user);
  return userCredential;
};

export { loginWithGoogle, loginWithEmailPassword, signUpWithEmailPassword, registerUserInDatabase };