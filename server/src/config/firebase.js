import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();
console.log(process.env.FIREBASE_PROJECT_ID)

admin.initializeApp({
  credential: admin.credential.cert({
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    project_id: process.env.FIREBASE_PROJECT_ID,
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();

export { admin, db }