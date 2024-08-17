import React, { useEffect } from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../ReduxStore/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { toggleDarkMode, setPremium } from "../../ReduxStore/PremiumSlice";
import { logo } from "../../assets/Images";

function MainNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const { isDarkMode, isPremium } = useSelector((state) => state.UI);

  useEffect(() => {
    if (expenses) {
      const totalExpense = expenses.reduce((acc, expense) => {
        return acc + Number(expense.expensePrice);
      }, 0);

      dispatch(setPremium(totalExpense > 10000));
    }
  }, [expenses, dispatch]);

  const showTooltip =
    !isPremium ||
    (expenses &&
      expenses.reduce(
        (acc, expense) => acc + Number(expense.expensePrice),
        0
      ) <= 10000);

  const LogoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: isDarkMode ? "#333" : "#FFD700",
          color: isDarkMode && "#FFFFFF",
          padding: "0 5%",
          justifyContent: "space-between",
          height: "100px",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="application logo"
          style={{ width: "100px", height: "100%", borderRadius: "30%" }}
        />
        <Typography>
          Your profile is incomplete. <Link to="/profile">Click here</Link> to
          update.
        </Typography>
        <Box>
          <Tooltip
            title={
              showTooltip
                ? "Dark mode will be active if your expenses are more than 10k"
                : "Dark mode is " + (isDarkMode ? "enabled" : "disabled")
            }
            arrow
          >
            <span>
              <Button disabled={!isPremium} onClick={handleDarkModeToggle}>
                {isDarkMode ? (
                  <Brightness7Icon sx={{ color: "white" }} />
                ) : (
                  <DarkModeIcon sx={{ color: "black" }} />
                )}
              </Button>
            </span>
          </Tooltip>
        </Box>
        <Button variant="contained" color="secondary" onClick={LogoutHandler}>
          LogOut
        </Button>
      </Box>
    </>
  );
}

export default MainNav;
