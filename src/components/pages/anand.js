import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { getDoc, doc } from "firebase/firestore";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import { useContext } from "react";

const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const [_email, _setEmail] = useState("");
  const [_password, _setPassword] = useState("");
  const userData = useContext(UserContext);
  const { email, setEmail } = userData;

  useEffect(() => {
    setIsFormValid(email && password && !emailError && !passwordError);
    return () => {
      setIsFormValid({});
    };
  }, [email, password, emailError, passwordError]);

  const handleInputChangeEamil = (e) => {
    _setEmail(e.target.value);
  };

  const handleInputChangePwd = (e) => {
    _setPassword(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isFormValid) {
        // const user = { email, password };
        //console.log(user);
        const docSnap = await getDoc(doc(db, "users", _email));
        const user = docSnap.data();
        console.log(user);
        if (user.password === _password) {
          toast.success("Login Successfully");
          setEmail(_email);
          navigate("/mails");
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
                value={_email}
                className="form-control"
                onChange={handleInputChangeEamil}
              />
              {/* {emailError && <div className="form-text">{emailError}</div>} */}
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
              {/* {passwordError && (
                <div className="form-text">{passwordError}</div>
              )} */}
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
    </>
  );
};

export default Login;
