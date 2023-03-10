import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // const onLogout = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  // };

  return (
    <>
      <div className="mb-4 py-4">
        <nav className="navbar navbar-dark  bg-dark">
          <div className="container mx-auto">
            <div className="d-flex">
              <Link to="/" className="navbar-brand">
                eMail-App
              </Link>
            </div>
            <div className="d-flex">
              {/* <Link to="/login" className="btn btn-dark">
                Login
              </Link> */}
              <button
                className="btn btn-dark"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="btn btn-dark"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
