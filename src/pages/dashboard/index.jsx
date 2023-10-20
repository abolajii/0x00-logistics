import { Container, Small } from "../../components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Grid, GridContainer, Inner } from "./styles";
import { formatBalance, fullDate } from "../../helper";

import React from "react";
import { useExpense } from "../expense/hook/useExpense";
import { useJobStore } from "../jobs/hook/useJob";
import { useTransaction } from "../transactions/hook/useTransaction";

const Dashboard = () => {
  const [showBalance, setShowBalance] = React.useState(false);

  const { expenses } = useExpense();

  const { transactions } = useTransaction();

  const totalNetProfit = transactions.reduce((total, transaction) => {
    const matchingExpenses = expenses.filter(
      (expense) =>
        fullDate(expense.createdAt) === fullDate(transaction.createdAt)
    );
    const totalExpenses = matchingExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return total + (transaction.totalAmountPaid - totalExpenses);
  }, 0);

  // Function to toggle the visibility of the balance
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  return (
    <Container title="Dashboard">
      <Inner>
        <Small title="Balance" />
        <GridContainer>
          <Grid>
            <div className="top">
              <p className="name">A-Quads Errands balance</p>
              {showBalance ? (
                <div className="flex ai-center">
                  <p className="bal">{formatBalance(totalNetProfit)}</p>
                  <div
                    className="center cursor icon"
                    onClick={toggleBalanceVisibility}
                  >
                    <FiEye size={14} color="#000" />
                  </div>
                </div>
              ) : (
                <div className="flex ai-center">
                  <div className="bal">₦*** · **</div>
                  <div
                    className="center cursor icon"
                    onClick={toggleBalanceVisibility}
                  >
                    <FiEyeOff size={14} color="#000" />
                  </div>
                </div>
              )}
            </div>
            <p className="date">17 Oct, 2023.</p>
          </Grid>
        </GridContainer>
      </Inner>
    </Container>
  );
};

export default Dashboard;
