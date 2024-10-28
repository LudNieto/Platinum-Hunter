// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlRNASxoOTW0wbnjrVkcsyNb4-N6hA6-0",
  authDomain: "platinum-hunter.firebaseapp.com",
  databaseURL: "https://platinum-hunter-default-rtdb.firebaseio.com",
  projectId: "platinum-hunter",
  storageBucket: "platinum-hunter.appspot.com",
  messagingSenderId: "39583042452",
  appId: "1:39583042452:web:91e820433ebcf8fc1fdd81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = { auth, db };