import {
  Button,
  Container,
  CustomCheckbox,
  CustomTag,
  Small,
} from "../../components";
import { formatBalance, shortDate } from "../../helper";

import React from "react";
import axios from "axios";
import { colors } from "../../constants";
import styled from "styled-components";
import { useJobStore } from "./hook/useJob";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useParams } from "react-router-dom";

const url = "http://localhost:6600";

const Width = styled.div`
  width: 600px;
  /* background: Red; */
  margin-top: 30px;
  /* height: 600px; */
  padding-bottom: 40px;
  border-bottom: 1px solid #ccc;

  .status {
    color: #3b3a3c;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    margin-top: 40px;
    /* margin-bottom: 24px; */
    padding-bottom: 24px;
    border-bottom: 1px solid #eff2f5;
    border-radius: 3px;
  }

  .status-title {
    color: #000;
    font-size: 15px;
    font-weight: 500;
    line-height: 150%;
    margin-top: 30px;
    margin-bottom: 15px;
  }
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

const Bottom = styled.div`
  .value {
    border-radius: 15px;
    border: 1px solid #e8e6ea;
    background: ${colors.white};
    /* width: 100%; */
    padding: 16px;
    margin-top: 10px;
    width: 270px;
  }

  .bottom-title {
    color: ${colors.black};
    font-size: 15px;
    font-weight: 500;
    line-height: 150%; /* 22.5px */
  }
`;

// const Input = styled.input`
//   border-radius: 15px;
//   border: 1px solid #e8e6ea;
//   background: ${colors.white};
//   width: 100%;
//   padding: 16px;
//   margin-top: 10px;
// `;

const GridTwoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .item {
    margin-top: 10px;
  }
`;

const SingleJob = () => {
  const { setJob, job } = useJobStore();
  const { id } = useParams();

  const [paymentStatus, setPaymentStatus] = React.useState("");

  const { openModal, closeModal } = useModalStore();

  const [jobStatus, setJobStatus] = React.useState("");

  const handlePaymentStatusChange = (value) => {
    setPaymentStatus(value);
  };

  const handleJobStatusChange = (value) => {
    setJobStatus(value);
  };

  const getJob = async (id) => {
    return await axios.get(`${url}/job/${id}`);
  };

  React.useEffect(() => {
    const allJobs = async () => {
      try {
        const response = await getJob(id);
        setJob(response.data);
        setPaymentStatus(response.data.paymentStatus);
        setJobStatus(response.data.jobStatus);
      } catch (error) {
        console.log(error);
      }
    };

    allJobs();
  }, [setJob, id]);

  const updateJob = async (data) => {
    return await axios.put(`${url}/job/${id}`, { data });
  };

  const handleUpdateJob = async () => {
    const data = {};

    if (paymentStatus !== job.paymentStatus) {
      data.paymentStatus = paymentStatus;
    }

    if (jobStatus !== job.jobStatus) {
      data.jobStatus = jobStatus;
    }

    if (Object.keys(data).length > 0) {
      openModal();

      try {
        const response = await updateJob(data);
        console.log(response.data);
        setJob(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        closeModal();
      }
    }
  };

  return (
    <Container title="View Job">
      <Small title="Job Details" />
      <Width>
        <div className="flex">
          <div>
            <GridContainer>
              <GridItem>
                <p className="title">Date</p>
                <p className="value">{shortDate(job.createdAt)}</p>
              </GridItem>
              <GridItem>
                <p className="title">Job Status</p>
                <div>
                  <CustomTag tag={job.jobStatus} />
                </div>
              </GridItem>

              <GridItem>
                <p className="title">Payment Status</p>
                <div>
                  <CustomTag tag={job.paymentStatus} />
                </div>
              </GridItem>
            </GridContainer>
          </div>
          <div className="flex-1">
            <TotalBalance>
              <p className="bold">{job.amount && formatBalance(job.amount)}</p>
              <p className="small">Total made</p>
            </TotalBalance>
          </div>
        </div>
        <Bottom>
          <GridTwoContainer>
            <div className="item">
              <div className="bottom-title">Customer Name</div>
              <div className="value flex ai-center">{job?.customerName}</div>
            </div>
            <div className="item">
              <div className="bottom-title">Payer</div>
              <div className="value flex ai-center">{job?.payer}</div>
            </div>
            <div className="item">
              <div className="bottom-title">Pick up</div>
              <div className="value flex ai-center">{job?.pickUp}</div>
            </div>
            <div className="item">
              <div className="bottom-title">Delivery</div>
              <div className="value flex ai-center">{job?.delivery}</div>
            </div>
          </GridTwoContainer>
          <div>
            <div className="status">Update status</div>

            <div className="status-title">Job Status</div>
            <div>
              <CustomCheckbox
                label="Done"
                value="done"
                checkedValue={jobStatus}
                onChange={handleJobStatusChange}
              />
              <CustomCheckbox
                label="Pending"
                value="pending"
                checkedValue={jobStatus}
                onChange={handleJobStatusChange}
              />
              <CustomCheckbox
                label="Void"
                value="void"
                checkedValue={jobStatus}
                onChange={handleJobStatusChange}
              />
              <CustomCheckbox
                label="Canceled"
                value="canceled"
                checkedValue={jobStatus}
                onChange={handleJobStatusChange}
              />

              <CustomCheckbox
                label="Next day"
                value="next-day"
                checkedValue={jobStatus}
                onChange={handleJobStatusChange}
              />
            </div>

            <div className="status-title">Payment Status</div>

            <div>
              <CustomCheckbox
                label="Paid"
                value="paid"
                checkedValue={paymentStatus}
                onChange={handlePaymentStatusChange}
              />

              <CustomCheckbox
                label="Not Paid"
                value="not-paid"
                checkedValue={paymentStatus}
                onChange={handlePaymentStatusChange}
              />
            </div>
          </div>
        </Bottom>
      </Width>
      <Width>
        <div className="flex jc-end">
          <div className="">
            <Button title="Save Changes" onClick={handleUpdateJob} />
          </div>
        </div>
      </Width>
    </Container>
  );
};

export default SingleJob;
