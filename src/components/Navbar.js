import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="mb-4 py-4">
      <nav className="navbar navbar-dark fixed-top bg-dark">
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

            <Link to="/register" className="btn btn-dark  ">
              Register
            </Link>
            <Link to="/logout" className="btn btn-dark" onClick={onLogout}>
              Logout
            </Link>

            {/* {loggedIn && (
              <Link to="/logout" className="btn btn-dark  ">
                Logout
              </Link>
            )} */}
            {/* <Link to="/" className="btn btn-dark " onClick={handleLogout}>
              Logout
            </Link> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
