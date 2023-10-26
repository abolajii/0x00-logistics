import { Container, Small } from "../../components";
import { formatBalance, shortDate } from "../../helper";

import { LMAuth } from "../../service/api.service";
import React from "react";
import TransactionDetails from "./transaction.details";
import { colors } from "../../constants";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useTransaction } from "./hook/useTransaction";

const Inner = styled.div`
  margin-top: 20px;

  h2 {
    color: ${colors.textColor};
    font-size: 15px;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
    margin-bottom: 15px;
  }
`;

const GridContainer = styled.div`
  width: 600px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  margin-bottom: 14px;
  padding-bottom: 50px;
  border-bottom: 1px solid #eff2f5;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title {
    color: ${colors.textThree};
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
  }

  .value {
    color: ${colors.textColor};
    font-size: 15px;
    font-weight: 700;
    line-height: 150%; /* 22.5px */
  }
`;

const Status = styled.div`
  display: inline-flex;
  padding: 6px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
`;

const Pending = styled(Status)`
  background: #f9f3df;
  color: #e1b000;
`;

const Done = styled(Status)`
  background: #dff2e8;
  color: #2ca764;
`;

const Bottom = styled.div`
  border-bottom: 1px solid #eff2f5;
  padding-bottom: 10px;
  /* width: 600px; */
`;

const TotalBalance = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  /* flex: 1 0 0; */
  margin-left: 20px;
  width: 90%;

  border-radius: 12px;
  background: ${colors.bgSecondary};

  .bold {
    color: ${colors.textColor};
    font-size: 34px;
    font-weight: 700;
    line-height: normal;
    /* letter-spacing: -0.68px; */
  }

  .small {
    color: #7e8299;
    font-size: 16px;
    font-weight: 500;
    /* line-height: 30px; 187.5% */
    letter-spacing: -0.32px;
  }
`;

const SingleTransaction = () => {
  const { setTransaction, transaction } = useTransaction();
  const { id } = useParams();

  const getAllTransaction = async (id) => {
    return await LMAuth.get(`/transaction/${id}`);
  };

  React.useEffect(() => {
    const allJobs = async () => {
      try {
        const response = await getAllTransaction(id);
        setTransaction(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allJobs();
  }, [setTransaction, id]);

  // Calculate total paid jobs and unpaid jobs
  const totalPaidJobs = transaction.jobs.filter(
    (job) => job.paymentStatus === "paid"
  );
  const totalUnpaidJobs = transaction.jobs.filter(
    (job) => job.paymentStatus === "not-paid"
  );

  // Calculate the total amount of paid jobs
  const totalAmountPaidJobs = totalPaidJobs.reduce(
    (total, job) => total + job.amount,
    0
  );

  // Calculate the total amount of unpaid jobs
  const totalAmountUnpaidJobs = totalUnpaidJobs.reduce(
    (total, job) => total + job.amount,
    0
  );

  return (
    <Container title="View Transaction">
      <Small title="View Transaction" />
      <Inner>
        <div className="flex">
          <div>
            <GridContainer>
              <GridItem>
                <p className="title">Date</p>
                <p className="value">{shortDate(transaction.createdAt)}</p>
              </GridItem>
              <GridItem>
                <p className="title">No of Jobs</p>
                <p className="value">{transaction.numberOfJobs}</p>
              </GridItem>
              <GridItem>
                <p className="title">Transaction ID</p>
                <p className="value">{transaction.transactionId}</p>
              </GridItem>
              <GridItem>
                <p className="title">Payment Status</p>
                {transaction.paymentStatus === "not-paid" ? (
                  <div>
                    <Pending>Pending Payment</Pending>
                  </div>
                ) : (
                  <div>
                    <Done>All Paid</Done>
                  </div>
                )}
              </GridItem>
            </GridContainer>
          </div>
          <div className="flex-1">
            <TotalBalance>
              <p className="bold">
                {formatBalance(totalAmountPaidJobs + totalAmountUnpaidJobs)}
              </p>
              <p className="small">Total made</p>
            </TotalBalance>
          </div>
        </div>

        <Bottom>
          {totalPaidJobs.length > 0 && (
            <>
              <h2>Paid Customer(s)</h2>
              <TransactionDetails
                jobDetails={totalPaidJobs}
                total={totalAmountPaidJobs}
              />
            </>
          )}

          {totalUnpaidJobs.length > 0 && (
            <>
              <h2>Outstanding Customer(s)</h2>
              <TransactionDetails
                jobDetails={totalUnpaidJobs}
                total={totalAmountUnpaidJobs}
              />
            </>
          )}
        </Bottom>
      </Inner>
    </Container>
  );
};

export default SingleTransaction;
