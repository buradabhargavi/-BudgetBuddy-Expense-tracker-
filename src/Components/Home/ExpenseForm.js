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
import { useDispatch, useSelector } from "react-redux";
import { createExpense } from "../../ReduxStore/ExpenseSlice";

function ExpenseForm() {
  const priceRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [showExpense, setShowExpense] = useState(false);
  const { isDarkMode } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user?.split("@")[0] || "");

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const toggleAddExpense = () => {
    setShowExpense((prev) => !prev);
  };

  const cancelHandler = () => {
    setShowExpense(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredPrice = priceRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDate = dateRef.current.value;

    const expenseData = {
      expensePrice: enteredPrice,
      expenseDescription: enteredDescription,
      expenseCategory: selectedCategory,
      enteredDate,
    };

    dispatch(createExpense({ userId, expenseData }));

    priceRef.current.value = "";
    descriptionRef.current.value = "";
    setShowExpense(false);
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        padding: 2,
        display: "flex",
        color: isDarkMode ? "#FFFFFF" : "#333",
        background: isDarkMode ? "#333" : "#FFFFFF",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add Your Expense Here
      </Typography>
      {!showExpense && (
        <Button
          onClick={toggleAddExpense}
          variant="contained"
          color="secondary"
          sx={{ marginBottom: 2 }}
        >
          Add Expense
        </Button>
      )}
      {showExpense && (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
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
            <TextField
              type="date"
              fullWidth
              variant="outlined"
              inputRef={dateRef}
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
                justifyContent: "space-between",

                mt: 2,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                color="error"
                onClick={cancelHandler}
                sx={{ flex: 0.3 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ flex: 0.3 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default ExpenseForm;
