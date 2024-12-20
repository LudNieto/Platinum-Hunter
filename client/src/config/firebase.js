import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const auth = firebase.auth();
export { firebase, db };