import React, { useContext, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import AuthContext from "../../Store/Auth-context";
import { NavLink, useNavigate } from "react-router-dom";

function Signin() {
  const userEmailref = useRef();
  const userPasswordref = useRef();
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = userEmailref.current.value;
    const password = userPasswordref.current.value;
    console.log(email, password);

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
        //  console.log(ctx.login);
        ctx.login(authData.idToken);
        navigate("/home");
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
      <Typography variant="h4">User login</Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          /*   border: "1px solid black",
          padding: "5% 2%", */
          flexDirection: "column",
          gap: "20px",
          width: "25%",
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
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Typography>
          new user?
          <NavLink to={"/signup"}>create an account</NavLink>
        </Typography>
        <Typography>forgot password?</Typography>
      </Box>
    </Box>
  );
}

export default Signin;
