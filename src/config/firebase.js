import dotenv from 'dotenv';
import { initializeApp, applicationDefault } from "firebase-admin/app";
import {getFirestore} from 'firebase-admin/firestore';
import {getAuth} from 'firebase-admin/auth';

dotenv.config();

// Initialize Firebase
initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();
const auth = getAuth();

export {db, auth};