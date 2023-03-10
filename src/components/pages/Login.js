import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import EmailList from "../mails/EmailList";
import { useContext } from "react";

const Login = () => {
  //const navigate = useNavigate();
  const userData = useContext(UserContext);
  const { email, password, emailError, passwordError, handleInputChange } =
    userData;
  const [isFormValid, setIsFormValid] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsFormValid(email && password && !emailError && !passwordError);
    return () => {
      setIsFormValid({}); // This worked for me
    };
  }, [email, password, emailError, passwordError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isFormValid) {
        const user = { email, password };
        console.log(user);
        const docSnap = await getDoc(doc(db, "users", email));
        const userData = docSnap.data();
        console.log(userData);
        if (userData.email === email && userData.password === password) {
          toast.success("Login Successfully");

          setSuccess(true);
          // setTimeout(() => {
          //   navigate("/mails");
          // }, 3000);
        } else {
          toast.error("Email and password do not match");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("User does not exit");
    }
  };

  return (
    <>
      {success ? (
        <>
          <EmailList email={email} />
        </>
      ) : (
        <div className="bg-light rounded-3 col-md-6 mx-auto mt-5">
          <div className="container-fluid py-3">
            <h5 className="fw-bold">Login Form</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={handleInputChange}
                />
                {emailError && <div className="form-text">{emailError}</div>}
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  onChange={handleInputChange}
                />
                {passwordError && (
                  <div className="form-text">{passwordError}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary mx-2"
                disabled={!isFormValid}
                email={email}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
