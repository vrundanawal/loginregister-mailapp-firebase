import React, { useState, useEffect } from "react";
// import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

const Register = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const userData = useContext(UserContext);
  const {
    fname,
    lname,
    phone,
    email,
    password,
    fnameError,
    lnameError,
    phoneError,
    emailError,
    passwordError,
    handleInputChange,
  } = userData;

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
      setIsFormValid({});
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
    isFormValid,
  ]);

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
