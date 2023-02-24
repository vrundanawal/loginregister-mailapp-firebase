import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; //for auth
import { getDatabase, ref, set } from "firebase/database"; //for database
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
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(firebaseApp); //for Auth
const dataBase = getDatabase(firebaseApp); //to get the database from firebase

const FirebaseContext = createContext(null);

//create a custom hook
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  /*
  This function is responsible to signin the user
@params email - email 
@ param password - password
@return createUser - I will create a user in firebase 
This function is going to pass to context provider in value
  */
  //utility functions
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putDatToDatabase = (key, data) => {
    set((dataBase, key), data);
  };
  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPassword, putDatToDatabase }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
