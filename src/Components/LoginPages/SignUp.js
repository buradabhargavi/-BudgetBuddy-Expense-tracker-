import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const PasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = PasswordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    const data = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq3UUsh6wr0Dnf9bCJBO7TfxPTIzPkPbY",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const response = await data.json();
    if (response && response.error && response.error.message) {
      let errorMessage = "Authentication failed";
      errorMessage = response.error.message;
      return alert(errorMessage);
    }
    navigate("/home");
    return response;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "30px",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        SIGN UP{" "}
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
          id="name"
          type={"text"}
          label="Full Name"
          placeholder="Enter your name"
          inputRef={nameRef}
          required
        ></TextField>
        <TextField
          id="email"
          type={"email"}
          label="Email"
          placeholder="example@gmail.com"
          inputRef={emailRef}
          required
        ></TextField>
        <TextField
          id="password"
          type={"text"}
          label="password"
          placeholder="create new password"
          inputRef={PasswordRef}
          required
        ></TextField>
        <TextField
          id="confirmPassword"
          type={"text"}
          label="confirm password"
          placeholder="Enter your password"
          inputRef={confirmPasswordRef}
          required
        ></TextField>
        <Button variant="contained" type="submit">
          Sign up
        </Button>
      </form>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography>Already have an account?</Typography>
        <Link to="/signin" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </Box>
    </Box>
  );
}

export default SignUp;
