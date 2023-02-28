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
    const { email, password } = user;
    if (email === "" || password === "") {
      alert("All fields are required!");
    }
    const docRef = doc(db, "users", email);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //console.log(docSnap.data());
        const usersData = docSnap.data().user;
        //console.log(usersData);
        let registerEmail = usersData.email;
        let registerPassword = usersData.password;
        if (email === registerEmail && password === registerPassword) {
          navigate("/mails");
        } else {
          alert("User Password is not match");
        }
      } else {
        console.log("Document does not exist");
        alert("Email is not register");
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

          <div
            className="btn btn-primary mx-2"
            test={user}
            onClick={handleSubmit}
          >
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
