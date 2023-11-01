/* eslint-disable react/prop-types */
import { FiEye, FiEyeOff } from "react-icons/fi";

import Button from "../button";
import { LMAuth } from "../../service/api.service";
import React from "react";
import { colors } from "../../constants";
import styled from "styled-components";
import useAlertStore from "../../hook/useAlertStore";
import useModalStore from "../loading/hook/useModalStore";

const Container = styled.div`
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;

  .btn-container {
    margin-top: 50px;
  }
`;

const Inner = styled.div`
  background: ${colors.white};
  width: 450px;
  margin: auto;
  margin-top: 90px;
  border-radius: 9px;
  padding: 30px 25px;

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
    margin-bottom: 10px;
    font-size: 15px;
  }

  .icon {
    margin-left: 10px;
  }
`;

const Modal = ({ close }) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showOne, setShowOne] = React.useState(false);
  const [showTwo, setShowTwo] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const { setError, setSuccess } = useAlertStore();
  const { openModal, closeModal } = useModalStore();

  const toggleBalanceVisibility = () => {
    setShow(!show);
  };

  const verifyPassword = async () => {
    return await LMAuth.post("/verify/password", { password: oldPassword });
  };

  const updatePassword = async (data) => {
    return await LMAuth.put("/update/password", { data });
  };

  const checkPassword = async () => {
    if (step === 1) {
      openModal();
      try {
        await verifyPassword(oldPassword);
        setStep(2);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        closeModal();
      }
    } else {
      openModal();
      try {
        const response = await updatePassword({ oldPassword, newPassword });
        setSuccess(response.data.message);
        close();
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        closeModal();
      }
    }
  };
  return (
    <Container>
      <Inner>
        <h2>Update password</h2>
        {step === 1 && (
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
          </div>
        )}
        {step === 2 && (
          <>
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
            </div>
            <div>
              <p>New password</p>
              <div className="flex ai-center justify-between box">
                <div className="flex flex-1">
                  <input
                    value={newPassword}
                    type={showOne ? "text" : "password"}
                    className="w-100"
                    placeholder="New password"
                    onChange={({ target }) => setNewPassword(target.value)}
                  />
                </div>
                <div
                  className="icon center"
                  onClick={() => setShowOne(!showOne)}
                >
                  {showOne ? (
                    <FiEyeOff size={14} color="#000" />
                  ) : (
                    <FiEye size={14} color="#000" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <p>Retype password</p>
              <div className="flex ai-center justify-between box">
                <div className="flex flex-1">
                  <input
                    value={cPassword}
                    type={showTwo ? "text" : "password"}
                    className="w-100"
                    placeholder="Retype password"
                    onChange={({ target }) => setCPassword(target.value)}
                  />
                </div>
                <div
                  className="icon center"
                  onClick={() => setShowTwo(!showTwo)}
                >
                  {showTwo ? (
                    <FiEyeOff size={14} color="#000" />
                  ) : (
                    <FiEye size={14} color="#000" />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <div className="btn-container">
          <Button className="w-100" title="Submit" onClick={checkPassword} />
        </div>
      </Inner>
    </Container>
  );
};

export default Modal;
