//Navigate component which is used to redirect(old redirect component)
//Outlet which allow us to render child route or child element
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ userDetails }) => {
  return userDetails ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
