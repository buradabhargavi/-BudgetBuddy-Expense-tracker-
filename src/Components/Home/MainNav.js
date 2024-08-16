import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../ReduxStore/AuthSlice";
import { useNavigate } from "react-router-dom";

function MainNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LogoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography>welcome to main page</Typography>
        <Typography> your profile is inComplete{"   "}</Typography>
        <Button variant="contained" onClick={LogoutHandler}>
          LogOut
        </Button>
      </Box>
    </>
  );
}

export default MainNav;
