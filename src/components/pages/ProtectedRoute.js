import React from "react";
import Navbar from "../Navbar";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navbar to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
