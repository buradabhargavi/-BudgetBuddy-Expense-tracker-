import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(null);

  const changeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAq3UUsh6wr0Dnf9bCJBO7TfxPTIzPkPbY",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: userEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email. Please try again.");
      }

      const data = await response.json();
      console.log(data);
      alert("Password reset email has been sent. Please check your inbox.");

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={submitHandler} style={{ width: "100%" }}>
        <TextField
          type="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userEmail}
          onChange={changeHandler}
          required
          autoComplete="email"
        />
        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ marginBottom: "16px" }}
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ marginTop: "16px" }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Send Password Reset Email"
          )}
        </Button>
      </form>
    </Box>
  );
}

export default ForgotPassword;
