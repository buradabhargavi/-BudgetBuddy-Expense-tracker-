import React from "react";
import MainNav from "./MainNav";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function Home() {
  return (
    <div>
      <MainNav></MainNav>
      <ExpenseForm></ExpenseForm>
      <ExpenseList></ExpenseList>
    </div>
  );
}

export default Home;
