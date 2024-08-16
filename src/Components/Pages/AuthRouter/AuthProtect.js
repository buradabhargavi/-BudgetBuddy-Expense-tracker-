import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthProtect = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default AuthProtect;
