// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "smart-travel-assistant-f5ab5.firebaseapp.com",
  projectId: "smart-travel-assistant-f5ab5",
  storageBucket: "smart-travel-assistant-f5ab5.firebasestorage.app",
  messagingSenderId: "383777826469",
  appId: "1:383777826469:web:8d5bbe45bd8677b14d4f4c",
  measurementId: "G-TDMH8EFMLV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

