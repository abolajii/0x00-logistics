import { Button, Container, Small } from "../../components";

import React from "react";
import Table from "./table";
import axios from "axios";
import { useExpense } from "./hook/useExpense";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const Expense = () => {
  const { setExpenses, expenses } = useExpense();

  const navigate = useNavigate();

  const getAllExpenses = async () => {
    return await axios.get(`${url}/expenses`);
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
        <Small title={`Expense (${expenses.length})`} />
        <Button title="Create" onClick={() => navigate("/expense/create")} />
      </div>
      <Table />
    </Container>
  );
};

export default Expense;
