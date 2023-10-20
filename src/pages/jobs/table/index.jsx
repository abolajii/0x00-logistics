import { Column, HeaderColumn, Row, TableContainer } from "./styles";

import Details from "./details";
import { formatDate } from "../../../helper";
import { useJobStore } from "../hook/useJob";

// import React from "react";

const columns = [
  { id: 1, title: "JOB ID", key: "jobId" },
  { id: 2, title: "NAME", key: "customerName" },
  { id: 3, title: "PICKUP", key: "pickUp" },
  { id: 4, title: "DELIVERY", key: "delivery" },
  { id: 5, title: "DATE", key: "createdAt" },
  { id: 6, title: "DETAILS", key: "details" },
];

// const jobs = [
//   {
//     jobId: "ID: 32102",
//     customerName: "Tosin",
//     pickUp: "Fadeyi",
//     delivery: "Ojo",
//     amount: 3000,
//     jobStatus: "done",
//     paymentStatus: "paid",
//     createdAt: "2023-10-18T09:54:09.684Z",
//   },
//   {
//     jobId: "ID: 21402",
//     customerName: "Omo hair",
//     pickUp: "Oshodi",
//     delivery: "Igando",
//     amount: 2500,
//     jobStatus: "done",
//     paymentStatus: "not-paid",
//     createdAt: "2023-10-18T09:54:09.684Z",
//   },
//   {
//     jobId: "ID: 21402",
//     customerName: "Omo hair",
//     pickUp: "Oshodi",
//     delivery: "Ogba",
//     amount: 2500,
//     jobStatus: "pending",
//     paymentStatus: "not-paid",
//     createdAt: "2023-10-18T09:54:09.684Z",
//   },
// ];

const Table = () => {
  const { jobs } = useJobStore();
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
      {jobs.map((each, index) => {
        return (
          <Row key={index} className="flex">
            {columns.map((column) => {
              const { id, key } = column;
              return (
                <Column key={id}>
                  {key === "details" ? (
                    <Details status={each["jobStatus"]} id={each._id} />
                  ) : key === "createdAt" ? (
                    formatDate(each[key]) // Format the date here
                  ) : (
                    each[key]
                  )}
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
