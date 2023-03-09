import React, { useState, useEffect } from "react";
// import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
//import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import UserContext from "../context/UserContext";

const Register = () => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(
      fname &&
        lname &&
        email &&
        password &&
        !fnameError &&
        !lnameError &&
        !phoneError &&
        !emailError &&
        !passwordError
    );
    return () => {
      setIsFormValid({}); // This worked for me
    };
  }, [
    fname,
    lname,
    email,
    phone,
    password,
    fnameError,
    lnameError,
    passwordError,
    phoneError,
    emailError,
  ]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        setFirstName(value);
        setFnameError(
          value
            ? /[a-zA-Z]+([_ -]?[a-zA-Z]){3,40}$/.test(value)
              ? ""
              : "Minimum 3 letters are required,no special characters and numbers allowed"
            : "Please enter the text"
        );
        break;
      case "lname":
        setLastName(value);
        setlnameError(
          value
            ? /[a-zA-Z]+([_ -]?[a-zA-Z]){3,40}$/.test(value)
              ? ""
              : "Minimum 3 letters are required,no special characters and numbers allowed"
            : "Please Enter your name"
        );
        break;
      case "phone":
        setPhone(value);
        setPhoneError(
          value
            ? /^[0-9]{10}$/.test(value)
              ? ""
              : "Only numbers with 10 digits allow"
            : "Please Enter your number"
        );
        break;
      case "email":
        setEmail(value);
        setEmailError(
          value
            ? /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
              ? ""
              : "Please enter a valid email address"
            : "Please enter your email address."
        );
        break;
      case "password":
        setPassword(value);
        setPasswordError(
          value
            ? value.length < 6
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
    if (isFormValid) {
      //submit the form data
      const user = { fname, lname, email, phone, password };
      console.log(user);
      await setDoc(doc(db, "users", email), user);
      await setDoc(doc(db, "mails", email), {});

      toast.success("User detail stored successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setLastName("");
      setFirstName("");
      setPhone("");
      setEmail("");
      setPassword("");
    } else {
      toast.error("Please fill out all fields correctly");
    }
  };
  return (
    <>
      <div className="bg-light rounded-3 col-md-6 mx-auto mt-5">
        <div className="container-fluid py-3">
          <div className="showDiv">
            <div className="card col-md-4 mx-auto p-3 bg-light">
              <p>
                <b className="text-success">Login successfully</b>
              </p>
            </div>
          </div>

          <h5 className="fw-bold">Registration Form</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="FName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                autoComplete="off"
                className="form-control"
                value={fname}
                onChange={handleInputChange}
              />

              {fnameError && (
                <div className="form-text text-danger">{fnameError}</div>
              )}

              <label htmlFor="LName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                autoComplete="off"
                value={lname}
                className="form-control"
                onChange={handleInputChange}
              />
              {lnameError && (
                <div className="form-text text-danger">{lnameError}</div>
              )}
              <label htmlFor="Phone number" className="form-label">
                Phone number
              </label>
              <input
                type="number"
                name="phone"
                value={phone}
                autoComplete="off"
                className="form-control"
                onChange={handleInputChange}
              />
              {phoneError && (
                <div className="form-text text-danger">{phoneError}</div>
              )}
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                autoComplete="off"
                className="form-control"
                onChange={handleInputChange}
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
                value={password}
                autoComplete="off"
                className="form-control"
                onChange={handleInputChange}
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
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
