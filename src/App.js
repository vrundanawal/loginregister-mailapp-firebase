import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Home from "./components/Home";
import EmailList from "./components/pages/EmailList";
import { useContext } from "react";
import UserContext from "./components/context/UserContext";
import ProtectedRoute from "./components/pages/ProtectedRoute";

function App() {
  const userData = useContext(UserContext);
  const { user } = userData;

  const handleLogin = () => user.setUser({ id: "1", name: "robin" });
  const handleLogout = () => user.setUser(null);
  return (
    <>
      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
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
