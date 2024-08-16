import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EditExpenseForm = ({ open, onClose, onSubmit, expense }) => {
  const [formData, setFormData] = useState(expense);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(expense.id, formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <TextField
          name="expensePrice"
          label="Price"
          value={formData.expensePrice}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="expenseDescription"
          label="Description"
          value={formData.expenseDescription}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="expenseCategory"
          label="Category"
          value={formData.expenseCategory}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseForm;
