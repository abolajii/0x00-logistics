import { Column, HeaderColumn, Row, TableContainer } from "./styles";
import { formatBalance, fullDate } from "../../../helper";

// import React from "react";
import { useExpense } from "../hook/useExpense";

const columns = [
  { id: 1, title: "ID", key: "id" },
  { id: 2, title: "EXPENSE", key: "expense" },
  { id: 3, title: "AMOUNT", key: "amount" },
  { id: 4, title: "DATE", key: "createdAt" },
];

// const jobs = [
//   {
//     id: 1,
//     status: "not-paid",
//     date: "Wednesday, Oct 18th 2023", // Date in ISO format
//     totalReturns: 3000,
//     numberOfPaidJobs: 0,
//     numberOfJobs: 3, // Number of jobs in a day
//     // You can add more details here if needed
//   },
//   {
//     id: 2,
//     settled: "SETTLED",
//     status: "paid",
//     date: "Tuesday, Oct 17th 2023", // Date in ISO format
//     totalReturns: 9000,
//     numberOfPaidJobs: 0,
//     numberOfJobs: 4, // Number of jobs in a day
//     // You can add more details here if needed
//   },
// ];

const Table = () => {
  const { expenses } = useExpense();

  const idExpenses = expenses.map((expense, index) => ({
    ...expense,
    id: index + 1,
  }));

  return (
    <TableContainer>
      <Row className="flex">
        {columns.map((column) => {
          return (
            <HeaderColumn key={column.id} alignRight={column.key === "details"}>
              {column.title}
            </HeaderColumn>
          );
        })}
      </Row>
      {idExpenses.map((each, index) => {
        return (
          <Row key={index} className="flex">
            {columns.map((column) => {
              const { id, key } = column;
              return (
                <Column key={id}>
                  {key === "amount"
                    ? formatBalance(each[key])
                    : key === "createdAt"
                    ? fullDate(each[key])
                    : each[key]}
                </Column>
              );
            })}
          </Row>
        );
      })}
    </TableContainer>
  );
};

export default Table;
