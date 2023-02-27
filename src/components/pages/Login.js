import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = () => {
    alert("Login successfully");
    navigate("/mails");
  };

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
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="btn btn-primary mx-2" onClick={handleLogin}>
            Login
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
