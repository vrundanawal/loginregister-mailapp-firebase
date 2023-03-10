import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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
              <Link to="/login" className="btn btn-dark">
                Login
              </Link>

              <Link to="/register" className="btn btn-dark">
                Register
              </Link>

              <Link to="/" className="btn btn-dark" style={{ display: "none" }}>
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
