import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EditExpenseForm = ({ open, onClose, onSubmit, expense }) => {
  const [editedExpense, setEditedExpense] = useState({
    expensePrice: expense.expensePrice,
    expenseDescription: expense.expenseDescription,
    expenseCategory: expense.expenseCategory,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    setEditedExpense((prev) => ({ ...prev, expenseCategory: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(expense.id, editedExpense);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <TextField
          name="expensePrice"
          label="Price"
          value={editedExpense.expensePrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number" // Ensure input is a number
        />
        <TextField
          name="expenseDescription"
          label="Description"
          value={editedExpense.expenseDescription}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={editedExpense.expenseCategory}
            onChange={handleSelectChange}
            label="Category"
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseForm;
