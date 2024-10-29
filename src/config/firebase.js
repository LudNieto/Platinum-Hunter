import app from "firebase/app";
import "firebase/firestore";


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
app.initializeApp(firebaseConfig);
const db = app.firestore();

export {db}
