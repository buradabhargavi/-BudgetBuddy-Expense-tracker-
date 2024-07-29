import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <Box>
      <Typography>welcome to main page</Typography>
      <NavLink to={"/Profile"}>update your profile</NavLink>
    </Box>
  );
}

export default Home;
