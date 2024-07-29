import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import VerifyEmail from "../LoginPages/VerifyEmail";
function Home() {
  return (
    <>
      <Box>
        <Typography>welcome to main page</Typography>
        <NavLink to={"/Profile"}>update your profile</NavLink>
      </Box>
      <Box>
        <VerifyEmail />
      </Box>
    </>
  );
}

export default Home;
