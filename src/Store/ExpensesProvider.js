import React, { useState, useEffect, useContext } from "react";
import ExpenseContext from "./ExpensesContext";
import AuthContext from "./Auth-context";

const ExpensesProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ctx = useContext(AuthContext);

  const user = ctx.user;
  // console.log(user);

  const userId = user ? user.substring(0, user.indexOf("@")) : null;
  // const userId = 12;

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

  const value = {
    expenses,
    addExpense,
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
