import React, { useContext } from "react";
import AuthContext from "../../../Store/Auth-context";
import { Navigate, Outlet } from "react-router-dom";

const AuthLogin = () => {
  const AuthCtx = useContext(AuthContext);
  console.log(AuthCtx.isLoggedIn);

  if (AuthCtx.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default AuthLogin;
