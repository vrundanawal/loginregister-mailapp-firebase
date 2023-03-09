import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Home from "./components/Home";
//import { useContext } from "react";
//import UserContext from "./components/context/UserContext";
//import ProtectedRoute from "./components/pages/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailList from "./components/mails/EmailList";

function App() {
  //const userData = useContext(UserContext);
  //const { user } = userData;

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*
          <Route
            path="/login"
            element={
              <ProtectedRoute user={user}>
                <Login />
              </ProtectedRoute>
            }
          /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/mails" element={<EmailList />} />
          {/* <Route path="/:id" element={<EmailList user={user} />} /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
