// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rajesh-house.firebaseapp.com",
  projectId: "rajesh-house",
  storageBucket: "rajesh-house.firebasestorage.app",
  messagingSenderId: "561368534730",
  appId: "1:561368534730:web:afc3c56443ff8f6686ae33",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
