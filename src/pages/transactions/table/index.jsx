import { Column, HeaderColumn, Row, TableContainer } from "./styles";
import { formatBalance, fullDate } from "../../../helper";

import Details from "./details";
import { useTransaction } from "../hook/useTransaction";

const columns = [
  { id: 1, title: "Transaction ID", key: "transactionId" },
  { id: 2, title: "N0 OF J0BS", key: "numberOfJobs" },
  { id: 3, title: "N0 0F PAID J0BS", key: "numberOfPaidJobs" },
  { id: 4, title: "DAILY RETURNS", key: "amount" },
  { id: 5, title: "DATE", key: "createdAt" },
  { id: 6, title: "DETAILS", key: "details" },
];

const Table = () => {
  const { transactions } = useTransaction();

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
      {transactions.map((each, index) => {
        return (
          <Row key={index} className="flex">
            {columns.map((column) => {
              const { id, key } = column;
              return (
                <Column key={id}>
                  {key === "details" ? (
                    <Details status={each["paymentStatus"]} id={each._id} />
                  ) : key === "amount" ? (
                    formatBalance(each[key])
                  ) : key === "createdAt" ? (
                    fullDate(each[key])
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
