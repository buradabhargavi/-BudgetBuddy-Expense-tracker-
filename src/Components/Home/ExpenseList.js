import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Typography,
  Divider,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditExpenseForm from "./EditExpenseForm";
import { emptyExpense } from "../../assets/Images";
import {
  fetchExpenses,
  updateExpense,
  deleteExpense,
} from "../../ReduxStore/ExpenseSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses, isLoading, error } = useSelector((state) => state.expenses);
  const { isDarkMode } = useSelector((state) => state.UI);

  const userId = useSelector((state) => state.auth.user?.split("@")[0] || "");

  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenses(userId));
    }
  }, [dispatch, userId]);

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedExpense(null);
  };

  const handleFormSubmit = (id, updatedExpense) => {
    dispatch(
      updateExpense({ userId, expenseId: id, editedExpense: updatedExpense })
    );
    handleDialogClose();
  };

  const handleDeleteClick = (expenseId) => {
    dispatch(deleteExpense({ userId, expenseId }));
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{
        marginTop: "30px",
        padding: 2,
        borderRadius: 1,
        color: isDarkMode ? "#FFFFFF" : "#333",
        background: isDarkMode ? "#333" : "#FFFFFF",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Expense List
      </Typography>
      <Paper
        sx={{
          padding: 2,
          color: isDarkMode ? "#FFFFFF" : "#333",
          background: isDarkMode ? "#333" : "#FFFFFF",
        }}
      >
        {(expenses && expenses.length === 0) || !expenses ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={emptyExpense} alt="No expenses added"></img>
            <Typography variant="h6" align="center">
              No expenses yet. You can add expenses by clicking "Add Expense".
            </Typography>
          </Box>
        ) : (
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
                  <Box sx={{ display: "flex", gap: "10px", flex: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditClick(expense)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(expense.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {selectedExpense && (
        <EditExpenseForm
          open={open}
          onClose={handleDialogClose}
          onSubmit={handleFormSubmit}
          expense={selectedExpense}
        />
      )}
    </Box>
  );
};

export default ExpenseList;
