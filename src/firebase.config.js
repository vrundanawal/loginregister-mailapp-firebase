// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //to store the data into database

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
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed

export const db = getFirestore(app);
