import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./Components/LoginPages/SignUp";
import Signin from "./Components/LoginPages/Signin";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import AuthProvider from "./Store/AuthProvider";
import AuthProtect from "./Components/Pages/AuthRouter/AuthProtect";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/home"
              element={
                <AuthProtect>
                  <Home />
                </AuthProtect>
              }
            />

            <Route
              path="/profile"
              element={
                <AuthProtect>
                  <Profile />
                </AuthProtect>
              }
            />

            <Route path="/" element={<Navigate to="/signin" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
