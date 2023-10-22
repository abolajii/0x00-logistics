// import React from "react";
import colors from "../../constants/colors";
import { formatBalance } from "../../helper";
import styled from "styled-components";
import { useExpense } from "./hook/useExpense";

const Container = styled.div`
  .quick {
    margin-top: 90px;
    color: var(--space, #424243);
    font-family: Lato;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 18px;
    margin-bottom: 18px;
    border-bottom: 1px solid #eff2f5;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 30px;
  gap: 16px;
  margin-bottom: 46px;
`;

const GridItem = styled.div`
  cursor: pointer;
  display: flex;
  padding: 15px;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  flex: 1 0 0;

  border-radius: 12px;
  background: ${colors.bgSecondary};

  &:hover {
    background: #f5f5f5;
  }

  .bold {
    color: ${colors.textColor};
    font-size: 34px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.68px;
  }

  .small {
    color: #7e8299;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px; /* 187.5% */
    letter-spacing: -0.32px;
  }
`;

const QuickClick = () => {
  const { setFormValue } = useExpense();

  const quickExpenses = [
    { id: 1, name: "Data", amount: 300 },
    { id: 2, name: "Tip", amount: 500 },
    { id: 3, name: "Airtime", amount: 500 },
    { id: 4, name: "Fuel", amount: 1000 },
    { id: 5, name: "Fuel", amount: 1500 },
    { id: 6, name: "Fuel", amount: 2000 },
    { id: 7, name: "Fuel", amount: 3000 },
    { id: 8, name: "Bike", amount: 5000 },
    { id: 9, name: "Sort", amount: 5000 },
    { id: 9, name: "Fuel", amount: 5000 },
  ];

  const handleClick = (expense) => {
    // console.log(expense);
    setFormValue("expense", expense.name);
    setFormValue("amount", expense.amount);
  };

  return (
    <Container>
      <p className="quick">QuickClick 🚀</p>

      <p>Here are some quick expense</p>

      <GridContainer>
        {quickExpenses.map((expense) => {
          return (
            <GridItem key={expense.id} onClick={() => handleClick(expense)}>
              <p className="bold">{formatBalance(expense.amount)}</p>
              <p className="small">{expense.name}</p>
            </GridItem>
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default QuickClick;
