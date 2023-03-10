import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Home from "./components/Home";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Signup from "./components/pages/Signup";
import SignIn from "./components/pages/SignIn";
import { useFirebase } from "./context/Firebase"; //custom hook
import { useState } from "react";

const db = getDatabase(app);
const auth = getAuth(app);

function App() {
  //store the custom hook in variable
  const firebase = useFirebase();
  console.log(firebase); //to see all utility function inside console

  const putData = () => {
    set(ref(db, "users/vrunda"), {
      id: 1,
      name: "Vrunda",
      age: 35,
    });
  };

  const signupUser = () => {
    createUserWithEmailAndPassword(auth, "vrunda@gmail.com", "123456")
      .then((userData) => {
        console.log(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //used to test context Api
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      <hr />
      <h1>Using Context Api</h1>
      <input
        type="email"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn btn-warning"
        onClick={() => {
          firebase.signupUserWithEmailAndPassword(email, password);
          firebase.putDatToDatabase("users/test", { email, password });
        }}
      >
        SignUp with ContextApi
      </button>
      <hr />
      <div className="p-4">
        <button className=" btn btn-primary" onClick={putData}>
          Put Data
        </button>
        <button className="mx-5 btn btn-primary" onClick={signupUser}>
          Create user
        </button>
        <Signup />
        <hr />
        <SignIn />
        <hr />
      </div>
    </>
  );
}

export default App;
