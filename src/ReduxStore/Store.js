import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";
import premiumReducer from "./PremiumSlice";

const Store = configureStore({
  reducer: { auth: AuthReducer, expenses: ExpenseReducer, UI: premiumReducer },
});

export default Store;
