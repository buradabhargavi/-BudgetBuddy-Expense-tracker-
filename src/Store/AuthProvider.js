import React, { useState } from "react";
import AuthContext from "./Auth-context";

function AuthProvider(props) {
  const intialToken = localStorage.getItem("Token");
  const [user, setUser] = useState("");

  //console.log(intialToken);
  setTimeout(() => {
    localStorage.removeItem("Token");
  }, 300000);
  const [token, setToken] = useState(intialToken);
  const userIsLoggedIn = !!token;

  const LoginHandler = (authData) => {
    localStorage.setItem("Token", authData.idToken);
    setToken(authData.idToken);
    setUser(authData);
  };

  const LogoutHandler = (token) => {
    localStorage.removeItem("Token");

    setToken("");
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: LoginHandler,
    logout: LogoutHandler,
    user: user,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
