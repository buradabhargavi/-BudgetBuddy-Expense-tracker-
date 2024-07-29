import React from "react";

const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: (token) => {},
});

export default AuthContext;
