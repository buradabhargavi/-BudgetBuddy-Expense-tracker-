import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLogin = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("is loggedin:", isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default AuthLogin;
