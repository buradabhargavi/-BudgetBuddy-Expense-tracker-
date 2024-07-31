import React, { useState, useContext } from "react";
import {
  List,
  ListItem,
  Typography,
  Divider,
  Box,
  Paper,
  Button,
} from "@mui/material";
import ExpenseContext from "../../Store/ExpensesContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditExpenseForm from "./EditExpenseFrom";
const ExpenseList = () => {
  const { expenses, loading, error, deleteExpense, editExpense } =
    useContext(ExpenseContext);

  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedExpense(null);
  };

  const handleFormSubmit = (id, updatedExpense) => {
    editExpense(id, updatedExpense);
    handleDialogClose();
  };

  const handleDeleteClick = (expenseId) => {
    deleteExpense(expenseId);
  };

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
