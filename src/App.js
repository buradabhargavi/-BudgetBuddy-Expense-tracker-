import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./Components/LoginPages/SignUp";
import Signin from "./Components/LoginPages/Signin";
import Profile from "./Components/Profile/Profile";
import AuthProvider from "./Store/AuthProvider";
import AuthContext from "./Store/Auth-context"; // Import AuthContext for authentication check

function App() {
  const { isLoggedIn } = useContext(AuthContext); // Use context to get authentication status

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/pro" element={<Profile />} />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />}
            />
            <Route path="/" element={<Navigate to="/signin" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
