import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";

const Store = configureStore({
  reducer: { auth: AuthReducer, expenses: ExpenseReducer },
});

export default Store;
