import React, { useState } from "react";
import { useFirebase } from "../../context/Firebase";

const Login = () => {
  //store the custom hook in variable
  const firebase = useFirebase();
  console.log(firebase); //to see all utility function inside console
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-light rounded-3 col-md-6 mx-auto mt-5">
      <div className="container-fluid py-3">
        <h5 className="fw-bold">Login Form</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <div className="form-text">Please Enter your Email</div> */}
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            className="btn btn-primary mx-2"
            onClick={() => {
              firebase.signIn(email, password);
            }}
          >
            Login
          </div>
          <div
            className="btn btn-warning mx-2"
            onClick={() => {
              firebase.signupWithGoogle();
            }}
          >
            SignIn With Google
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
