import {
  SkeletonCell,
  SkeletonHeaderCell,
  SkeletonRow,
  SkeletonTableWrapper,
} from "../../components/skeleton/styles";

import { Skeleton } from "../../components";
/* eslint-disable react/prop-types */
import { colors } from "../../constants";
import { formatBalance } from "../../helper";
import styled from "styled-components";
import { useTransaction } from "./hook/useTransaction";

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
  text-transform: capitalize;
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
  const { loading } = useTransaction();

  const columns = [
    { id: 1, title: "Customer", key: "customerName" },
    { id: 2, title: "Pick up", key: "pickUp" },
    { id: 3, title: "Delivery", key: "delivery" },
    { id: 4, title: "Amount", key: "amount" },
    { id: 5, title: "Payer", key: "payer" },
  ];

  if (loading) {
    return (
      <Container>
        <SkeletonTableWrapper>
          <SkeletonRow>
            {[...Array(5)].map((_, index) => {
              return (
                <SkeletonHeaderCell key={index}>
                  <Skeleton width="100px" height="24px" border={5} />
                </SkeletonHeaderCell>
              );
            })}
          </SkeletonRow>
        </SkeletonTableWrapper>

        {[...Array(5)].map((_, index) => {
          return (
            <SkeletonRow key={index}>
              <SkeletonCell>
                <Skeleton width="120px" height="20px" border={3} />
              </SkeletonCell>
              <SkeletonCell>
                <Skeleton width="120px" height="20px" border={3} />
              </SkeletonCell>
              <SkeletonCell>
                <Skeleton width="120px" height="20px" border={3} />
              </SkeletonCell>
              <SkeletonCell>
                <Skeleton width="120px" height="20px" border={3} />
              </SkeletonCell>
              <SkeletonCell>
                <Skeleton width="120px" height="20px" border={3} />
              </SkeletonCell>
            </SkeletonRow>
          );
        })}

        <div className="flex ai-center balance">
          <div className="title">Total:</div>
          <div className="value">
            <Skeleton width="120px" height="30px" border={3} />
          </div>
        </div>
      </Container>
    );
  }

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
