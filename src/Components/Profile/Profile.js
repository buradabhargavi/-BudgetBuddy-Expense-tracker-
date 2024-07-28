import React, { useContext, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import PublicIcon from "@mui/icons-material/Public";
import AuthContext from "../../Store/Auth-context";

function Profile() {
  const fullName = useRef();
  const profileURL = useRef();
  const ctx = useContext(AuthContext);
  console.log(ctx);

  const editProfile = async (e) => {
    e.preventDefault();
    const userName = fullName.current.value;
    const profile = profileURL.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAq3UUsh6wr0Dnf9bCJBO7TfxPTIzPkPbY",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.token,
            photoUrl: profile,
            displayName: userName,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("data updated successfully");
      } else {
        throw new Error("profile update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Box
        sx={{
          borderBottom: "2px solid gray",
          marginBottom: "20px",
          paddingBottom: "10px",
        }}
      >
        <Typography variant="body1" sx={{ color: "red" }}>
          Your profile is 64% completed. Complete the remaining fields for
          better understanding.
        </Typography>
      </Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <form onSubmit={editProfile}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              variant="outlined"
              inputRef={fullName}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHubIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profile URL"
              type="url"
              variant="outlined"
              inputRef={profileURL}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
              type="submit"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default Profile;
