import { firebase, db } from '../config/firebase';

// Inicio de sesión con Google
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  const user = result.user;

  const userDoc = await db.collection('users').doc(user.uid).get();

  if (!userDoc.exists) {
    await registerUserInDatabase(user);
  }

  return user;
};

// Inicio de sesión con usuario y contraseña
const loginWithEmailPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

// Registro de usuario en la base de datos
export const registerUserInDatabase = (user) => {
  return db.collection('users').doc(user.uid).set({
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    role: 'user'
  });
};

// Registro de usuario con email y contraseña
const signUpWithEmailPassword = async (email, password) => {
  const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await registerUserInDatabase(userCredential.user);
  return userCredential;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const getUserRole = async (uid) => {
  const userDoc = await db.collection('users').doc(uid).get();
  return userDoc.exists ? userDoc.data().role : null;
}

export const logout = () => {
  return firebase.auth().signOut();
};

export { loginWithEmailPassword, signUpWithEmailPassword };