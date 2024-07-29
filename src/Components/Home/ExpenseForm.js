import React, { useRef, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function ExpenseForm() {
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [showExpense, setShowExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredPrice = priceRef.current.value;
    const enteredDescription = descriptionRef.current.value;

    const expenseData = {
      expensePrice: enteredPrice,
      expenseDescription: enteredDescription,
      expenseCategory: selectedCategory,
    };

    setExpenses((prev) => [...prev, expenseData]);

    //  console.log(expenses);

    priceRef.current.value = "";
    descriptionRef.current.value = "";
    setSelectedCategory("Other");
  };

  const toggleAddExpense = () => {
    setShowExpense((prev) => !prev);
  };

  const cancelHandler = () => {
    setShowExpense(false);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "auto",
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Your Expense Here
      </Typography>
      <Button
        onClick={toggleAddExpense}
        variant="contained"
        color="secondary"
        sx={{ marginBottom: 2 }}
      >
        {showExpense ? "Hide Form" : "Add Expense"}
      </Button>
      {showExpense && (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              inputRef={priceRef}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Description"
              multiline
              rows={1}
              fullWidth
              variant="outlined"
              inputRef={descriptionRef}
              sx={{ flex: 1 }}
            />

            <FormControl fullWidth sx={{ flex: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleSelectChange}
                label="Category"
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ flex: 0.3 }}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="error"
                onClick={cancelHandler}
                sx={{ flex: 0.3 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default ExpenseForm;
