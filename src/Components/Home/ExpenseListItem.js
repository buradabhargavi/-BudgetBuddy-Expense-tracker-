import React from "react";
import { ListItem, Typography, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";

const ExpenseListItem = ({ expense, onEditClick, onDeleteClick }) => {
  return (
    <>
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
        <Typography variant="h6" sx={{ flex: 1 }}>
          {expense.enteredDate}
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", flex: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => onEditClick(expense)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => onDeleteClick(expense.id)}
          >
            Delete
          </Button>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default ExpenseListItem;
