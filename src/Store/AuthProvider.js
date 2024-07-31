import React, { useState } from "react";
import AuthContext from "./Auth-context";

function AuthProvider(props) {
  const intialToken = localStorage.getItem("Token");
  const initialUserData = localStorage.getItem("email");
  console.log(initialUserData);
  const [user, setUser] = useState(initialUserData || "");

  //console.log(intialToken);
  setTimeout(() => {
    localStorage.removeItem("Token");
  }, 300000);
  const [token, setToken] = useState(intialToken);
  const userIsLoggedIn = !!token;

  const LoginHandler = (authData) => {
    localStorage.setItem("Token", authData.idToken);
    localStorage.setItem("email", authData.email);
    setToken(authData.idToken);

    setUser(authData.email);
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
