import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  isLoading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (userId) => {
    const response = await fetch(
      `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}.json`
    );
    if (!response.ok) throw new Error("Failed to fetch expenses");
    const data = await response.json();
    console.log(data);
    if (data) {
      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    } else {
      return [];
    }
  }
);

export const createExpense = createAsyncThunk(
  "expenses/createExpense",
  async ({ userId, expenseData }) => {
    const response = await fetch(
      `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}.json`,
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) throw new Error("Failed to submit expense data");
    const result = await response.json();
    console.log(result);
    return { id: result.name, ...expenseData };
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ userId, expenseId, editedExpense }) => {
    const response = await fetch(
      `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}/${expenseId}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedExpense),
      }
    );
    if (!response.ok) throw new Error("Failed to update expense");
    return { id: expenseId, ...editedExpense };
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async ({ userId, expenseId }) => {
    const response = await fetch(
      `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}/${expenseId}.json`,
      { method: "DELETE" }
    );
    if (!response.ok) throw new Error("Failed to delete expense");
    return expenseId;
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        console.log("State before push:", state.expenses);
        console.log("Payload:", action.payload);

        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const { id, ...updatedExpense } = action.payload;
        const existingExpense = state.expenses.find((exp) => exp.id === id);
        if (existingExpense) {
          Object.assign(existingExpense, updatedExpense);
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const expenseId = action.payload;
        state.expenses = state.expenses.filter((exp) => exp.id !== expenseId);
      });
  },
});

export default expenseSlice.reducer;
