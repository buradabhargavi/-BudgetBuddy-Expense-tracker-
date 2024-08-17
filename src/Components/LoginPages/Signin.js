import React, { useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../ReduxStore/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("So the redux value is: ", isLoggedIn);
  const userEmailref = useRef();
  const userPasswordref = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = userEmailref.current.value;
    const password = userPasswordref.current.value;
    //   console.log(email, password);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq3UUsh6wr0Dnf9bCJBO7TfxPTIzPkPbY",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response;
      if (data.ok) {
        const authData = await data.json();
        console.log(authData);

        dispatch(authActions.login(authData));
        localStorage.setItem("email", authData.email);
        localStorage.setItem("token", authData.idToken);

        navigate("/Home");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        height: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "Bold" }}>
        USER LOGIN
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          id="email"
          type={"email"}
          label="Email"
          placeholder="example@gmail.com"
          inputRef={userEmailref}
          required
        ></TextField>
        <TextField
          id="password"
          type={"password"}
          label="Password"
          inputRef={userPasswordref}
          placeholder="Enter your password"
          required
        ></TextField>
        <Typography>
          <Link
            to="/forgotPassword"
            style={{
              textDecoration: "none",
              justifyContent: "flex-end",
              marginTop: "-10px",
            }}
          >
            forgot password?
          </Link>
        </Typography>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
      <Box>
        <Typography>
          New User?
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signin;
