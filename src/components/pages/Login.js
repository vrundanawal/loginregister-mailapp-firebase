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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const { email, password } = user;
    if (email && password) {
      const docRef = doc(db, "users", email);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
          navigate("/mails");
        } else {
          console.log("Document does not exist");
          alert("User does not exist. Please register the user");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("All fields are required");
    }
  };
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
          {/* <div className="btn btn-primary mx-2" onClick={handleLogin}>
            Login
          </div> */}
          <div className="btn btn-primary mx-2" onClick={handleSubmit}>
            Login
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
