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

const db = getDatabase(app);
const auth = getAuth(app);

function App() {
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
      <div className="p-4">
        <button className=" btn btn-primary" onClick={putData}>
          Put Data
        </button>
        <button className="mx-5 btn btn-primary" onClick={signupUser}>
          Create user
        </button>
        <Signup />
      </div>
    </>
  );
}

export default App;
