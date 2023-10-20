/* eslint-disable react/prop-types */
import { colors } from "../../constants";
import { formatBalance } from "../../helper";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 20px;

  .balance {
    margin-top: 20px;
  }

  .title {
    color: ${colors.textFive};
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    margin-right: 5px;
  }

  .amount {
    color: ${colors.textOne};
    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    line-height: normal;
  }
`;

const Row = styled.div`
  border-bottom: 1px dashed #e4e6ef;
`;

const Column = styled.div`
  flex: ${(props) => (props.expand ? 1.5 : 1)};
  padding: 8px 0;
  display: flex;
  align-items: center;
  color: ${colors.textColor};
  font-size: 15px;
  font-weight: 700;
  line-height: 150%; /* 22.5px */
`;
const HeaderColumn = styled(Column)`
  color: ${colors.textThree};
  font-size: 12px;
  letter-spacing: 0.36px;
  font-weight: 500;
  text-transform: uppercase;
  justify-content: flex-start;
  text-align: left;
`;

const TransactionDetails = ({ jobDetails, total }) => {
  const columns = [
    { id: 1, title: "Customer", key: "customerName" },
    { id: 2, title: "Pick up", key: "pickUp" },
    { id: 3, title: "Delivery", key: "delivery" },
    { id: 4, title: "Amount", key: "amount" },
    { id: 5, title: "Payer", key: "payer" },
  ];

  return (
    <Container>
      <Row className="flex">
        {columns.map((column) => {
          return <HeaderColumn key={column.id}>{column.title}</HeaderColumn>;
        })}
      </Row>

      {jobDetails.map((each, index) => {
        return (
          <Row key={index} className="flex">
            {columns.map((column) => {
              const { id, key } = column;
              return <Column key={id}>{each[key]}</Column>;
            })}
          </Row>
        );
      })}

      <div className="flex ai-center balance">
        <div className="title">Total:</div>
        <div className="value">{formatBalance(total)}</div>
      </div>
    </Container>
  );
};

export default TransactionDetails;
