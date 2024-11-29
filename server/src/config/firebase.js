import dotenv from 'dotenv';
import admin from 'firebase-admin';
import {applicationDefault } from "firebase-admin/app";

dotenv.config();

// Initialize Firebase
admin.initializeApp({
  credential: applicationDefault()
});




export default admin;