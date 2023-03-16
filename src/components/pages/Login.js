import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import UserContext from "../context/UserContext";
import { useContext } from "react";

import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [_email, _setEmail] = useState("");
  const [_password, _setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(false);

  const userData = useContext(UserContext);
  const { setEmail } = userData;

  useEffect(() => {
    setIsFormValid(_email && _password && !emailError && !passwordError);
    //readCookies();
    return () => {
      setIsFormValid({});
    };
  }, [_email, _password, emailError, passwordError]);

  const handleInputChangeEamil = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        _setEmail(value);
        setEmailError(
          value
            ? /\S+@\S+\.\S+/.test(value)
              ? ""
              : "Please enter a valid email address"
            : "Please enter your email address."
        );
        break;
      default:
        break;
    }
  };

  const handleInputChangePwd = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        _setPassword(value);
        setPasswordError(
          value
            ? value.length < 5
              ? "Password must be at least 6 characters long."
              : ""
            : "Please enter your password."
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isFormValid) {
        // const userCollectionSnap = await getDocs(collection(db, "users"));

        // userCollectionSnap.forEach((doc) => {
        //   //console.log(doc.id, " => ", doc.data());
        //   console.log(doc.data());
        //   let email1 = doc.data();
        //   //console.log(email1);

        //   // if (email1 !== _email) {
        //   //   alert("Email not match");
        //   // }
        // });

        const docSnap = await getDoc(doc(db, "users", _email));
        const user = docSnap.data();
        //console.log(user);

        if (user.password === _password) {
          // setEmail(_email);
          Cookies.set("user", _email);
          setStatus(true);
          setEmail(user);
          setErrorMessage("User login Successfully");
          // setTimeout(() => {
          //   navigate("/mails");
          // }, 1000);
          navigate("/mails");
        } else {
          setStatus(true);
          setErrorMessage("password do not match");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-light rounded-3 col-md-6 mx-auto mt-5">
        {status && (
          <div className="card col-md-4 mx-auto p-3 bg-light">
            <p>
              <b className="text-success">{errorMessage}</b>
            </p>
          </div>
        )}
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
                value={_email}
                className="form-control"
                onChange={handleInputChangeEamil}
              />
              {emailError && (
                <div className="form-text text-danger">{emailError}</div>
              )}
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={_password}
                className="form-control"
                onChange={handleInputChangePwd}
              />
              {passwordError && (
                <div className="form-text text-danger">{passwordError}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary mx-2"
              disabled={!isFormValid}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
