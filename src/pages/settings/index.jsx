import { Button, Container, Modal, NavHeader, Small } from "../../components";

import { LMAuth } from "../../service/api.service";
import React from "react";
import { colors } from "../../constants";
import { formatBalance } from "../../helper";
import styled from "styled-components";
import useAlertStore from "../../hook/useAlertStore";
import { useLogin } from "../login/hook/useLogin";
import useModalStore from "../../components/loading/hook/useModalStore";

const Inner = styled.div`
  width: 600px;
  margin-top: 30px;

  .note {
    font-size: 11px;
    font-weight: bold;
    color: #416b69;
    margin-top: 2px;
  }

  .width {
    width: 270px;
  }

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

  .margin {
    margin-top: 30px;
  }

  .value,
  input {
    border-radius: 15px;
    border: 1px solid #e8e6ea;
    background: ${colors.white};
    /* width: 100%; */
    padding: 16px;
    margin-top: 10px;
    width: 270px;
    font-size: 15px;
  }

  .bottom-title {
    color: ${colors.black};
    font-size: 15px;
    font-weight: 500;
    line-height: 150%; /* 22.5px */
  }

  .update {
    color: red;
  }

  .btn-container {
    margin-top: 100px;
    padding: 16px 0;

    border-top: 1px solid #eff2f5;
  }
`;

const GridTwoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .item {
    margin-top: 10px;
  }
`;

const Settings = () => {
  const { loggedInUser, setTotalAmount, totalAmount, setLoggedInUser } =
    useLogin();

  const { closeModal, openModal } = useModalStore();

  const { setSuccess } = useAlertStore();

  const [show, setShow] = React.useState(false);

  const [openingBalance, setOpeningBalance] = React.useState(
    loggedInUser.openingBalance || 0
  );

  const [businessName, setBusinessName] = React.useState(
    loggedInUser.businessName
  );

  const getDashboard = async () => {
    return await LMAuth.get(`/dashboard`);
  };

  React.useEffect(() => {
    const dashboardDetails = async () => {
      try {
        const response = await getDashboard();
        setTotalAmount(response.data.totalPaidJobsAmount);
      } catch (error) {
        console.log(error);
      }
    };

    dashboardDetails();
  }, [setTotalAmount]);

  const inputRef = React.useRef(null); // Create a ref for the input field
  const inputBusinessRef = React.useRef(null); // Create a ref for the input field
  const [readOnly, setReadOnly] = React.useState(true);
  const [readOnlyTwo, setReadOnlyTwo] = React.useState(true);
  // console.log(loggedInUser);

  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    // Use useEffect to focus the input field when readOnly is set to false
    if (!readOnly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [readOnly]);

  React.useEffect(() => {
    // Use useEffect to focus the input field when readOnly is set to false
    if (!readOnlyTwo && inputBusinessRef.current) {
      inputBusinessRef.current.focus();
    }
  }, [readOnlyTwo]);

  const handleInputChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setOpeningBalance(numericValue);
  };

  const updateUser = async (data) => {
    return await LMAuth.put("/user", { data });
  };

  const handleUpdate = async () => {
    openModal();
    try {
      const updatedData = {};

      if (businessName !== loggedInUser.businessName) {
        updatedData.businessName = businessName;
      }

      if (openingBalance !== loggedInUser.openingBalance) {
        updatedData.openingBalance = openingBalance;
      }

      if (Object.keys(updatedData).length > 0) {
        // Only send the update request if there are changes
        const response = await updateUser(updatedData);
        setLoggedInUser(response.data.user);
        setSuccess("Profile updated successfully");
      } else {
        // No changes to update
        setSuccess("No changes to save.");
      }
    } catch (error) {
      console.log(error);
      closeModal();
    } finally {
      closeModal();
    }
  };

  return (
    <Container title="Settings">
      {modal && <Modal close={() => setModal(false)} />}
      <Small title="Update Profile" />
      <NavHeader titleOne={"Settings"} />
      <Inner>
        <GridTwoContainer>
          <div className="item">
            <div className="flex ai-center justify-between width">
              <div className="bottom-title">Username</div>
            </div>
            <div className="value flex ai-center">{loggedInUser?.username}</div>
          </div>
          <div className="item">
            <div className="flex ai-center justify-between width">
              <div className="bottom-title">Business name</div>
              <div
                className="bottom-title update cursor"
                onClick={() => setReadOnlyTwo(false)}
              >
                Update
              </div>
            </div>
            <input
              ref={inputBusinessRef}
              readOnly={readOnlyTwo}
              type="text"
              value={businessName}
              onChange={({ target }) => setBusinessName(target.value)}
            />
          </div>

          <div className="item">
            <div className="bottom-title">Email</div>
            <div className="value flex ai-center">{loggedInUser?.email}</div>
          </div>
          <div className="item">
            <div className="flex ai-center justify-between width">
              <div className="bottom-title">Total made</div>
              <div
                className="bottom-title cursor update"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </div>
            </div>
            <div className="value flex ai-center">
              {show ? formatBalance(totalAmount) : "₦*****"}
            </div>
            <p className="note">*Balance without expense(s)</p>
          </div>
        </GridTwoContainer>
        <div>
          <div className="status">Business</div>
          <GridTwoContainer>
            <div className="item">
              <div className="flex ai-center justify-between width margin">
                <div className="bottom-title">Opening balance</div>
                {openingBalance === 0 && (
                  <div
                    className="bottom-title update cursor"
                    onClick={() => setReadOnly(false)}
                  >
                    Update
                  </div>
                )}
              </div>
              <input
                ref={inputRef}
                readOnly={readOnly}
                type="text"
                value={formatBalance(openingBalance)}
                onChange={handleInputChange}
              />
              <p className="note">*You can only set this once</p>
            </div>
            <div className="item">
              <div className="flex ai-center justify-between width margin">
                <div className="bottom-title">Password</div>

                <div
                  className="bottom-title update cursor"
                  onClick={() => setModal(true)}
                >
                  Update
                </div>
              </div>
              <div className="value flex ai-center">*************</div>
            </div>
          </GridTwoContainer>
        </div>
        <div className="btn-container flex jc-end">
          <div>
            <Button title="Save changes" onClick={handleUpdate} />
          </div>
        </div>
      </Inner>
    </Container>
  );
};

export default Settings;
