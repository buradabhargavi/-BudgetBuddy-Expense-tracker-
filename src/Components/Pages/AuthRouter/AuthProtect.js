import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../Store/Auth-context";
// Component to handle authenticated routes
const AuthProtect = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // If the user is not logged in, redirect to /signin
  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default AuthProtect;
