import { Container, Modal, Small } from "../../components";

import React from "react";
import { colors } from "../../constants";
import { formatBalance } from "../../helper";
import styled from "styled-components";
import { useLogin } from "../login/hook/useLogin";

const Inner = styled.div`
  width: 600px;
  margin-top: 30px;
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
`;

const GridTwoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .item {
    margin-top: 10px;
  }
`;

const Settings = () => {
  const { loggedInUser, totalAmount } = useLogin();
  const [openingBalance, setOpeningBalance] = React.useState(
    loggedInUser.openingBalance
  );
  const inputRef = React.useRef(null); // Create a ref for the input field
  const [readOnly, setReadOnly] = React.useState(true);
  // console.log(loggedInUser);

  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    // Use useEffect to focus the input field when readOnly is set to false
    if (!readOnly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [readOnly]);

  const handleInputChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setOpeningBalance(numericValue);
  };

  return (
    <Container title="Settings">
      {openModal && <Modal />}
      <Small title="Update Profile" />
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
              <div className="bottom-title update cursor">Update</div>
            </div>
            <div className="value flex ai-center">
              {loggedInUser?.businessName}
            </div>
          </div>

          <div className="item">
            <div className="bottom-title">Email</div>
            <div className="value flex ai-center">{loggedInUser?.email}</div>
          </div>
          <div className="item">
            <div className="flex ai-center justify-between width">
              <div className="bottom-title">Total made</div>
              <div className="bottom-title cursor update">Hide</div>
            </div>
            <div className="value flex ai-center">
              {formatBalance(totalAmount)}
            </div>
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
            </div>
            <div className="item">
              <div className="flex ai-center justify-between width margin">
                <div className="bottom-title">Password</div>

                <div
                  className="bottom-title update cursor"
                  onClick={() => setOpenModal(true)}
                >
                  Update
                </div>
              </div>
              <div className="value flex ai-center">*************</div>
            </div>
          </GridTwoContainer>
        </div>
      </Inner>
    </Container>
  );
};

export default Settings;
