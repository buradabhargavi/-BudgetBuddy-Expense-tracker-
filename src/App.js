import "./App.css";
import SignUp from "./Components/LoginPages/SignUp";
import Signin from "./Components/LoginPages/Signin";
import AuthProvider from "./Store/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/*  <SignUp /> */}
        <Signin />
      </div>
    </AuthProvider>
  );
}

export default App;
