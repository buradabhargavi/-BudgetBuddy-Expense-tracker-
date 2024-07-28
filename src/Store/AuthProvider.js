import React, { useState } from "react";
import AuthContext from "./Auth-context";

function AuthProvider(props) {
  const intialToken = localStorage.getItem("Token");
  setTimeout(() => {
    localStorage.removeItem("Token");
  }, 300000);
  const [token, setToken] = useState(intialToken);
  const userIsLoggedIn = !!token;
  const LoginHandler = (token) => {
    console.log(token);
    localStorage.setItem("Token", token);
    setToken(token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: LoginHandler,
  };
  return (
    <AuthContext.AuthProvider value={contextValue}>
      {props.children}
    </AuthContext.AuthProvider>
  );
}

export default AuthProvider;
