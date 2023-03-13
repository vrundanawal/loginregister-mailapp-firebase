import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useContext(UserContext);

  const { email } = userData;
  console.log(email.email);
  const userEmail = email.email;

  const handleLogOut = () => {
    navigate("/logout");
  };

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
              {!userEmail && userEmail === undefined ? (
                <>
                  <Link to="/login" className="btn btn-dark">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-dark">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="nav-item dropdown navbar-brand">
                    <h2
                      className="nav-link dropdown-toggle text-white"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {email.fname}
                    </h2>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          to="/logout"
                          className="dropdown-item"
                          onClick={handleLogOut}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              )}

              {/* {userEmail && (
                <>
                  <div className="nav-item dropdown navbar-brand">
                    <h2
                      className="nav-link dropdown-toggle text-white"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {email.fname}
                    </h2>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link to="/" className="dropdown-item">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              )} */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
