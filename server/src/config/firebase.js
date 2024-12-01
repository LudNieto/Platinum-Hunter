import dotenv from 'dotenv';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json' assert { type: 'json' };
import { applicationDefault } from 'firebase-admin/app';


dotenv.config();
console.log("R: ", process.env.FIREBASE_PROJECT_ID);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { admin, db }