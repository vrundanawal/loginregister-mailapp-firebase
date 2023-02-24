import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDV-IVgGvfgs8pgPqv2zyrT3uyUXErPR1Y",
  authDomain: "loginregister-mailapp-52a5f.firebaseapp.com",
  projectId: "loginregister-mailapp-52a5f",
  storageBucket: "loginregister-mailapp-52a5f.appspot.com",
  messagingSenderId: "185028082444",
  appId: "1:185028082444:web:4cf97e508c5c14851d2729",
  measurementId: "G-M5Z7NN0N9V",
  databaseURL:
    "https://loginregister-mailapp-52a5f-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore();
