import { FiEye, FiEyeOff } from "react-icons/fi";

import React from "react";
import { colors } from "../../constants";
import styled from "styled-components";

const Container = styled.div`
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
`;

const Inner = styled.div`
  background: ${colors.white};
  width: 450px;
  margin: auto;
  margin-top: 90px;
  border-radius: 5px;
  padding: 20px;
  height: 450px;

  h2 {
    color: #3b3a3c;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 24px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eff2f5;
    border-radius: 3px;
  }

  .box {
    border-radius: 15px;
    border: 1px solid #e8e6ea;
    background: ${colors.white};
    /* width: 100%; */
    padding: 16px;
    margin-top: 10px;
    font-size: 15px;
  }

  .icon {
    margin-left: 10px;
  }
`;

const Modal = () => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [show, setShow] = React.useState(false);

  const toggleBalanceVisibility = () => {
    setShow(!show);
  };
  return (
    <Container>
      <Inner>
        <h2>Update password</h2>
        <div>
          <p>Old password</p>
          <div className="flex ai-center justify-between box">
            <div className="flex flex-1">
              <input
                value={oldPassword}
                type={show ? "text" : "password"}
                className="w-100"
                placeholder="Old password"
                onChange={({ target }) => setOldPassword(target.value)}
              />
            </div>
            <div className="icon center" onClick={toggleBalanceVisibility}>
              {show ? (
                <FiEyeOff size={14} color="#000" />
              ) : (
                <FiEye size={14} color="#000" />
              )}
            </div>
          </div>
          {/* 
          <input
            value={oldPassword}
            type="password"
            className="w-100"
            placeholder="Old password"
            onChange={({ target }) => setOldPassword(target.value)}
          />
           */}
        </div>
      </Inner>
    </Container>
  );
};

export default Modal;
