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
import Display from "./Components/Profile/Display";
import AuthLogin from "./Components/Pages/AuthRouter/AuthLogin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<AuthLogin />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<Signin />} />
            </Route>
            <Route
              path="/*"
              element={
                <AuthProtect>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </AuthProtect>
              }
            />
            <Route
              path="/display"
              element={
                <AuthProtect>
                  <Display />
                </AuthProtect>
              }
            />

            <Route path="/" element={<Navigate to="/Home" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
