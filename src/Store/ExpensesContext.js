import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  editExpense: () => {},
});

export default ExpenseContext;
