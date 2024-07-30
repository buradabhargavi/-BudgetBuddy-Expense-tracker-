import React, { useContext } from "react";
import { List, ListItem, Typography, Divider, Box, Paper } from "@mui/material";
import ExpenseContext from "../../Store/ExpensesContext";

const ExpenseList = () => {
  const { expenses, loading, error } = useContext(ExpenseContext);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{
        margin: "auto",
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Expense List
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <List>
          {expenses.map((expense) => (
            <React.Fragment key={expense.id}>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {expense.expensePrice} Rupees
                </Typography>
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {expense.expenseDescription}
                </Typography>
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {expense.expenseCategory}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ExpenseList;
