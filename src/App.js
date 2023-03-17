import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Home from "./components/Home";
import { useContext } from "react";
import UserContext from "./components/context/UserContext";
import EmailList from "./components/mails/EmailList";
import Email from "./components/mails/Email";

//import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const userData = useContext(UserContext);
  const { email } = userData;

  console.log(email);

  return (
    <>
      <Router>
        <Navbar email={email} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          {/* <Route path="/mails" element={<EmailList userDetails={email} />} /> */}

          {/* <Route path="/mails" element={<ProtectedRoute />}>
            <Route path="/mails" element={<EmailList userDetails={email} />} />
          </Route> */}
          <Route path="/mails" element={<EmailList userDetails={email} />} />

          <Route path="/mail/:id" element={<Email />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
