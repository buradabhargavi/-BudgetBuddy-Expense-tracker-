import React, { useState } from "react";
import AuthContext from "./Auth-context";

function AuthProvider(props) {
  const intialToken = localStorage.getItem("Token");

  //console.log(intialToken);
  setTimeout(() => {
    localStorage.removeItem("Token");
  }, 300000);
  const [token, setToken] = useState(intialToken);
  const userIsLoggedIn = !!token;
  // console.log(userIsLoggedIn);
  const LoginHandler = (token) => {
    // console.log(token);
    localStorage.setItem("Token", token);
    // localStorage.setItem("email", email);
    setToken(token);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: LoginHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
