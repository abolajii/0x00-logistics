import { Container, NavHeader, Small } from "../../components";

import { LMAuth } from "../../service/api.service";
import React from "react";
import Table from "./table";
import { useTransaction } from "./hook/useTransaction";

const Transactions = () => {
  const { setTransactions, transactions } = useTransaction();

  const getAllTransactions = async () => {
    return await LMAuth.get(`/transactions`);
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
      <NavHeader titleOne="Transactions" path="/transactions" />
      <Table />
    </Container>
  );
};

export default Transactions;
