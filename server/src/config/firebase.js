import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

dotenv.config();

admin.initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

export { admin, db }