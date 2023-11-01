// import React from "react";
import styled from "styled-components";

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

const Otp = () => {
  return (
    <FormContainer>
      <FormBox>
        <h2>OTP Verification</h2>

        <p className="small-text">
          Type the verification code we’ve sent to your email address.
        </p>
        <strong>beejhaiy@gmail.com</strong>
      </FormBox>
    </FormContainer>
  );
};

export default Otp;
