import React from "react";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        alert("Success");
        const user = res.user;
        updateProfile(user, { displayName: name });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="signup-page">
      <label htmlFor="">Name</label>
      <br />
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        required
        placeholder="Enter name"
      />
      <br />
      <label htmlFor="">Email</label>
      <br />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        required
        placeholder="Enter email"
      />
      <br />
      <label htmlFor="">Password</label>
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        required
        placeholder="Enter password"
      />
      <br />

      <button onClick={createUser}>Signup</button>
    </div>
  );
};

export default Signup;
