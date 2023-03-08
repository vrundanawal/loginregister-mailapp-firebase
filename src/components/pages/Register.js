import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useForm } from "react-hook-form";

const Register = () => {
  //get this methods from useFrom
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset, //to set the value empty
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  //create a state to show the error messages

  const userData = useContext(UserContext);
  const { handleChange, user } = userData;

  //track for userDetail using useeffect
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  //Register the user in firebase
  const handleRegister = async (data) => {
    console.log(data);
    const docRef = doc(db, "users", user.email);
    console.log(docRef);
    try {
      const { fname, lname, email, password, phone } = user;
      if (fname && lname && email && password && phone) {
        await setDoc(doc(db, "users", email), user);
        await setDoc(doc(db, "mails", email), {});
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
    reset(); //to make the input field empty
  };

  //console.log(errors);

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
                autoComplete="off"
                //className="form-control"
                className={`form-control ${errors.fname && "invalid"} `}
                {...register("fname", {
                  required: "Name is required",
                  minLength: {
                    value: 4,
                    message: "Minimum Required length of name is 4",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum lenth is 15",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/i,
                    message: "No Spacial character is allowded",
                  },
                })}
                // onKeyUp={() => {
                //   trigger("fname");
                // }}
                onChange={handleChange}
              />
              {errors.fname && (
                <small className="text-danger">{errors.fname.message}</small>
              )}

              <br />
              {/* <div className="form-text" id="errormessage">
                Please Enter your Email
              </div> */}

              <label htmlFor="LName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                autoComplete="off"
                //className="form-control"
                className={`form-control ${errors.lname && "invalid"}`}
                {...register("lname", {
                  required: "Last Name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum Required length of last name is 2",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum lenth is 15",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "No Spacial character is allowded",
                  },
                })}
                onKeyUp={() => {
                  trigger("lname");
                }}
                onChange={handleChange}
              />
              {errors.lname && (
                <small className="text-danger">{errors.lname.message}</small>
              )}
              <br />

              <label htmlFor="Phone number" className="form-label">
                Phone number
              </label>
              <input
                type="number"
                name="phone"
                autoComplete="off"
                //className="form-control"
                className={`form-control ${errors.phone && "invalid"}`}
                {...register(
                  "phone",

                  {
                    required: "Phone is required",
                    pattern: {
                      value:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                      message: "Invalid phone no",
                    },
                  }
                )}
                onKeyUp={() => {
                  trigger("phone");
                }}
                onChange={handleChange}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
              <br />
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                //className="form-control"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
                onChange={handleChange}
              />
              {/* <div className="form-text">Please Enter your Email</div> */}
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
              <br />
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                //className="form-control"
                className={`form-control ${errors.password && "invalid"}`}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,})/,
                    message:
                      "The password must contain 1 lowerCase character, one number, one special character, and length 5 or more ",
                  },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
              <br />
            </div>

            <button
              className="btn btn-primary mx-2"
              onClick={handleSubmit(handleRegister)}
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
