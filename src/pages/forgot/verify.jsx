/* eslint-disable react/prop-types */
import { Button } from "../../components";
import { LMNoAuth } from "../../service/api.service";
import React from "react";
import styled from "styled-components";
import useAlertStore from "../../hook/useAlertStore";
import useModalStore from "../../components/loading/hook/useModalStore";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .small-text {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const FormBox = styled.div`
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  height: 390px;

  .label {
    margin: 10px 0 !important;
  }

  h2 {
    text-align: center;
    margin: 20px 0;
  }

  .btn-container {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;

  /* margin-top: 20px; */

  &:focus,
  &:hover,
  &:active {
    border-color: #3a605d;
  }
`;
const Error = styled.div`
  margin: 3px 0;
  color: red;
  font-size: 12px;
`;

const Verify = ({ setSteps, email, setEmail }) => {
  //
  const [clicked, setClicked] = React.useState(false);

  const { openModal, closeModal } = useModalStore();

  const { setSuccess, setError } = useAlertStore();

  const verifyUser = async (data) => {
    return LMNoAuth.post(`/verify/email`, data);
  };

  const handleVerification = async () => {
    setClicked(true);

    if (!email) {
      return;
    }
    openModal();
    try {
      const response = await verifyUser({ email });
      setSuccess(response.data.message);
      setSteps(2);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      closeModal();
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <h2>Forgot Password</h2>
        <p className="small-text">
          Please enter your valid email address. We will send you a 6-digit code
          to verify your account.
        </p>
        <div className="label">Email address</div>
        <Input
          style={{
            borderColor: clicked && !email ? "red" : "#ccc",
          }}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email === "" && clicked && <Error>This field is required</Error>}

        <div className="btn-container">
          <Button
            title={"Request OTP"}
            onClick={handleVerification}
            className="w-100"
          />
        </div>
      </FormBox>
    </FormContainer>
  );
};

export default Verify;
