import React, { useState, useEffect, useContext } from "react";
import ExpenseContext from "./ExpensesContext";
import AuthContext from "./Auth-context";

const ExpensesProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ctx = useContext(AuthContext);

  const user = ctx.user;

  //console.log(user);

  const userId = user ? user.substring(0, user.indexOf("@")) : null;

  useEffect(() => {
    if (userId) {
      const fetchExpenses = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}.json`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch expenses");
          }

          const data = await response.json();
          const loadedExpenses = [];

          for (const key in data) {
            loadedExpenses.push({
              id: key,
              ...data[key],
            });
          }

          setExpenses(loadedExpenses);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchExpenses();
    }
  }, [userId]);

  const addExpense = async (expenseData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}.json`,
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit expense data");
      }

      const result = await response.json();
      setExpenses((prev) => [...prev, { id: result.name, ...expenseData }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editExpense = async (expenseId, editedExpense) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}/${expenseId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedExpense),
        }
      );

      // Debugging: Check response status and text
      const responseText = await response.text(); // Read the response text
      console.log("Response status:", response);
      console.log("Response text:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to update expense. Status: ${response}`);
      }

      alert("Expense updated successfully");
      // Optionally, update local state if needed
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseId ? { ...expense, ...editedExpense } : expense
        )
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const response = await fetch(
        `https://expense-tracker-fb903-default-rtdb.firebaseio.com/Expenses/${userId}/${expenseId}.json `,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Expense cannot be deleted`);
      }
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );
      alert("Expense deleted successfully");
    } catch (error) {
      alert(error);
    }
  };

  const value = {
    expenses,
    addExpense,
    editExpense,
    deleteExpense,
    loading,
    error,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpensesProvider;
