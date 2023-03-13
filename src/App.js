import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Home from "./components/Home";
import { useContext, useState } from "react";
import UserContext from "./components/context/UserContext";
//import ProtectedRoute from "./components/pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmailList from "./components/mails/EmailList";
import Logout from "./components/pages/Logout";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [register, setRegister] = useState(false);
  const userData = useContext(UserContext);
  const { email } = userData;

  console.log(email);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Navbar email={email} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/mails" element={<EmailList email={email} />} />
          {/* <Route path="/mails" element={<Login />} /> */}
          {/* <Route path="/:id" element={<EmailList />} /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
