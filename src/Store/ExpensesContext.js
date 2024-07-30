import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
});

export default ExpenseContext;
