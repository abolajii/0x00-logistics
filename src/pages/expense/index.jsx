import { Button, Container, NavHeader, Small } from "../../components";

import { LMAuth } from "../../service/api.service";
import React from "react";
import Table from "./table";
import { useExpense } from "./hook/useExpense";
import { useNavigate } from "react-router-dom";

const Expense = () => {
  const { setExpenses, expenses } = useExpense();

  const navigate = useNavigate();

  const getAllExpenses = async () => {
    return await LMAuth.get(`/expenses`);
  };

  React.useEffect(() => {
    const allExpenses = async () => {
      try {
        const response = await getAllExpenses();
        setExpenses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allExpenses();
  }, [setExpenses]);

  return (
    <Container title="Expense">
      <div className="flex ai-center justify-between">
        <div>
          <Small title={`Expense (${expenses.length})`} />
          <NavHeader titleOne="Expense" path="/expense" />
        </div>
        <Button title="Create" onClick={() => navigate("/expense/create")} />
      </div>
      <Table />
    </Container>
  );
};

export default Expense;
