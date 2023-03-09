import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { getDoc, doc } from "firebase/firestore";
//import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  // const userDetails = useContext(UserContext);
  // const { user } = userDetails;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        setEmailError(
          value
            ? /\S+@\S+\.\S+/.test(value)
              ? ""
              : "Please enter a valid email address"
            : "Please enter your email address."
        );
        break;
      case "password":
        setPassword(value);
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
          setTimeout(() => {
            navigate("/mails");
          }, 3000);
        } else {
          toast.error("Email and password do not match");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("User does not exit");
    }
  };

  // const handleSubmit = async () => {
  //   //let getDatafromLocalstorage = JSON.parse(localStorage.getItem("userData"));
  //   //console.log(getDatafromLocalstorage);
  //   try {
  //     const { email, password } = user;
  //     if (email && password) {
  //       const docSnap = await getDoc(doc(db, "users", user.email));
  //       const userData = docSnap.data();
  //       // console.log(userData);
  //       if (userData.email === email && userData.password === password) {
  //         toast.success("Login Successfully");
  //         setTimeout(() => {
  //           navigate("/mails");
  //         }, 3000);
  //       } else {
  //         alert("Email and password do not match");
  //       }
  //     } else {
  //       console.log("Document does not exist");
  //       alert("All fields are required");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("User email and password are not match");
  //   }
  // };

  return (
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
            {passwordError && <div className="form-text">{passwordError}</div>}
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
  );
};

export default Login;
