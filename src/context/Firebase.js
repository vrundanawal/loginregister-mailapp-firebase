import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider, //for google login
  signInWithPopup,
} from "firebase/auth"; //for auth
import { getDatabase, ref, set } from "firebase/database"; //for database

//import { getFirestore } from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider(); //for google login

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
    const signupUser = createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )
      .then((res) => {
        alert("User Register Successfully");
        const userData = res.user;
        console.log(userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
        console.log(errorCode + errorMessage);
      });

    return signupUser;
  };

  const putDatToDatabase = (key, data) => {
    set(ref(dataBase, key), data);
  };

  const signIn = (email, password) => {
    const signInuser = signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        alert("Login Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
        console.log(errorCode + errorMessage);
      });

    return signInuser;
  };

  //signup with google account
  const signupWithGoogle = () => {
    const signupUser = signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user + "token :- " + token);
        alert(`Login Successfully`);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(email, credential);
        alert(errorCode + errorMessage);
      });
    return signupUser;
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        putDatToDatabase,
        signIn,
        signupWithGoogle,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
