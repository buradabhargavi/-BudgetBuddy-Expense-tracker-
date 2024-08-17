import React from "react";
import MainNav from "./MainNav";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function Home() {
  const { isDarkMode } = useSelector((state) => state.UI);
  return (
    <Box
      sx={{
        color: isDarkMode ? "#FFFFFF" : "#333",
        background: isDarkMode ? "#333" : "#FFFFFF",
      }}
    >
      <MainNav></MainNav>
      <ExpenseForm></ExpenseForm>
      <ExpenseList></ExpenseList>
    </Box>
  );
}

export default Home;
