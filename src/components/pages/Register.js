import React, { useEffect } from "react";
// import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
// import { useEffect } from "react";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const userData = useContext(UserContext);
  const { handleChange, user } = userData;

  //track for userDetail using useeffect
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  // const mail = {
  //   body: "test mail",
  //   subject: "test",
  // };

  //Register the user in firebase
  const handleRegister = async () => {
    try {
      const { fname, lname, email, password, phone } = user;
      if (fname && lname && email && password && phone) {
        await setDoc(doc(db, "users", user.email), user);

        await setDoc(doc(db, "mails", user.email), {});

        navigate("/login");
      } else {
        alert("All the fields are required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-light rounded-3 col-md-6 mx-auto mt-5">
        <div className="container-fluid py-3">
          <h5 className="fw-bold">Registration Form</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="FName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                className="form-control"
                onChange={handleChange}
              />

              <label htmlFor="LName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                className="form-control"
                onChange={handleChange}
              />

              <label htmlFor="Phone number" className="form-label">
                Phone number
              </label>
              <input
                type="number"
                name="phone"
                className="form-control"
                onChange={handleChange}
              />
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
              />
              {/* <div className="form-text">Please Enter your Email</div> */}
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="btn btn-primary mx-2" onClick={handleRegister}>
              Register
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
