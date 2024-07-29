import React, { useContext } from "react";
import AuthContext from "../../Store/AuthContent/Auth-Context";
import { Navigate, Outlet } from "react-router-dom";
const AuthLogin = () => {
  const AuthCtx = useContext(AuthContext);

  if (AuthCtx.isloggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default AuthLogin;
