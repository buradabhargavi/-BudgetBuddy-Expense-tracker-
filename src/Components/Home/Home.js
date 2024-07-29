import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography>welcome to main page</Typography>
        <Typography>
          {" "}
          your profile is inComplete{"   "}
          <NavLink to={"/Profile"}>update your profile</NavLink>
        </Typography>
      </Box>
      <Box></Box>
    </>
  );
}

export default Home;
