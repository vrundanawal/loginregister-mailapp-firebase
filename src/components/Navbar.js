import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mb-4 py-4">
      <nav className="navbar navbar-dark fixed-top bg-dark">
        <div className="container mx-auto">
          <div className="d-flex">
            <Link to="/" className="navbar-brand">
              Gmail-App
            </Link>
          </div>
          <div className="d-flex">
            <Link to="/login" className="btn btn-dark  ">
              Login
            </Link>
            <Link to="/register" className="btn btn-dark  ">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
