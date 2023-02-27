import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const [fname, setFName] = useState("");
  // const [lname, setLName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });
  //handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleRegister = () => {
    const { fname, lname, email, password, phone } = user;
    //add the validation
    if (fname && lname && email && password && phone) {
      addDoc(collection(db, `users`), {
        users: user,
      });

      navigate("/login");
    } else {
      alert("All the fields are required");
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
                value={user.fname}
                className="form-control"
                onChange={handleChange}
              />

              <label htmlFor="LName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={user.lname}
                className="form-control"
                onChange={handleChange}
              />

              <label htmlFor="Phone number" className="form-label">
                Phone number
              </label>
              <input
                type="number"
                name="phone"
                value={user.phone}
                className="form-control"
                onChange={handleChange}
              />
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

            <div className="btn btn-primary mx-2" onClick={handleRegister}>
              Register
            </div>

            <div
              className="btn btn-primary mx-2"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
