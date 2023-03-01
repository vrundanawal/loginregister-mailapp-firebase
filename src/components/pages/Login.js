import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { getDoc, doc } from "firebase/firestore";

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

  const handleSubmit = async () => {
    //console.log(user);

    try {
      const { email, password } = user;
      if (email && password) {
        const docSnap = await getDoc(doc(db, "users", user.email));
        const userData = docSnap.data();
        console.log(userData);
        console.log(userData.email);
        console.log(userData.password);
        if (userData.email === email && userData.password === password) {
          navigate("/mails");
        } else {
          alert("Email and password do not match");
        }
      } else {
        console.log("Document does not exist");
        alert("All fields are required");
      }
    } catch (error) {
      console.log(error);
      alert("User email and password are not match");
    }
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

          <div className="btn btn-primary mx-2" onClick={handleSubmit}>
            Login
          </div>
          <div
            className="btn btn-primary mx-2"
            onClick={() => navigate("/register")}
          >
            Register
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
