import { Column, HeaderColumn, Row, TableContainer } from "./styles";
import { formatBalance, fullDate } from "../../../helper";

import { useClient } from "../hook/useClient";

// import React from "react";

const columns = [
  { id: 1, title: "ID", key: "id" },
  { id: 2, title: "NAME", key: "name" },
  { id: 3, title: "N0 0F J0BS", key: "totalJobs" },
  { id: 4, title: "LAST JOB DATE", key: "lastJobDate" },
  { id: 4, title: "T0TAL J0BS AM0UNT", key: "totalJobAmount" },
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
  const { clients } = useClient();

  const idClients = clients.map((client, index) => ({
    ...client,
    id: index + 1,
  }));

  return (
    <TableContainer>
      <Row className="flex">
        {columns.map((column) => {
          return <HeaderColumn key={column.id}>{column.title}</HeaderColumn>;
        })}
      </Row>
      {idClients.map((each, index) => {
        return (
          <Row key={index} className="flex">
            {columns.map((column) => {
              const { id, key } = column;
              return (
                <Column key={id}>
                  {key === "totalAmount"
                    ? formatBalance(each[key])
                    : key === "lastJobDate"
                    ? each[key] === null
                      ? "-"
                      : fullDate(each[key])
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
