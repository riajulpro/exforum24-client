import React, { useContext } from "react";
import { AuthContext } from "../context/Authentication";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
