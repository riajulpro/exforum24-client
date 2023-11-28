import { useContext } from "react";
import { AuthContext } from "../context/Authentication";
import { Navigate, useLocation } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return "Please wait...";
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

export default UserRoutes;
