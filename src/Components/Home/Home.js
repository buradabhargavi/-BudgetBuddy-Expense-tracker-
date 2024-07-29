import { Box, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/Auth-context";
function Home() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const LogoutHandler = () => {
    ctx.logout();
    navigate("/signin");
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography>welcome to main page</Typography>
        <Typography>
          {" "}
          your profile is inComplete{"   "}
          <NavLink to={"/Profile"}>update your profile</NavLink>
        </Typography>
        <Button variant="contained" onClick={LogoutHandler}>
          LogOut
        </Button>
      </Box>
    </>
  );
}

export default Home;
