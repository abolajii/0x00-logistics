import { Container, Small } from "../../components";

import React from "react";
import Table from "./table";
import axios from "axios";
import { useTransaction } from "./hook/useTransaction";

const url = "http://localhost:6600";

const Transactions = () => {
  const { setTransactions, transactions } = useTransaction();

  const getAllTransactions = async () => {
    return await axios.get(`${url}/transactions`);
  };

  React.useEffect(() => {
    const allTransactions = async () => {
      try {
        const response = await getAllTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allTransactions();
  }, [setTransactions]);

  const length = transactions.filter(
    (job) => job.paymentStatus === "not-paid"
  ).length;

  return (
    <Container title="Transactions">
      <Small title={`Transactions (${length})`} />
      <Table />
    </Container>
  );
};

export default Transactions;
