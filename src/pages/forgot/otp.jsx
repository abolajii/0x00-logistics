import { Button } from "../../components";
import { LMNoAuth } from "../../service/api.service";
/* eslint-disable react/prop-types */
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

  .link {
    color: #426b69;
    margin-top: 20px;
    font-size: 14px;
    font-weight: bold;
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

  .otp {
    margin-top: 30px;
    gap: 10px;
    display: flex;
  }
`;

const OtpDigit = styled.input`
  width: 45px;
  height: 45px;
  text-align: center;
  font-size: 18px;
  border: 1px solid ${(props) => (props.isActive ? "#426b69" : "#ccc")};
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 1px solid "#426b69";
  }
`;

const Otp = ({ length, email, setSteps }) => {
  const [otp, setOtp] = React.useState(new Array(length).fill(""));
  const inputRefs = React.useRef([]);

  const [clicked, setClicked] = React.useState(false);

  const { openModal, closeModal } = useModalStore();

  const { setSuccess, setError } = useAlertStore();

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
      inputRefs.current[index - 1].focus(); // Move focus to the previous input
    }
  };

  const handleChange = (event, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = event.target.value;

    setOtp(updatedOtp);

    if (event.target.value && index < length - 1) {
      inputRefs.current[index + 1].focus(); // Move focus to the next input
    }
  };

  const verifyOtp = async (data) => {
    return LMNoAuth.post(`/verify/otp`, data);
  };

  const handleVerification = async () => {
    setClicked(true);

    if (otp.some((digit) => digit === "")) {
      return;
    }

    //  check if otp is empty
    openModal();
    try {
      const response = await verifyOtp({ otp: otp.join(""), email });
      setSuccess(response.data.message);
      setSteps(3);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      closeModal();
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <h2>OTP Verification</h2>

        <p className="small-text">
          Type the verification code we’ve sent to your email address.
        </p>
        <strong>{email}</strong>
        <div className="otp center">
          {otp.map((digit, index) => (
            <OtpDigit
              key={index}
              type="tel"
              maxLength={1}
              value={digit}
              style={{
                borderColor: clicked && !digit ? "red" : "#ccc",
              }}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              isActive={index === otp.findIndex((val) => val === "")}
              ref={(input) => (inputRefs.current[index] = input)}
            />
          ))}
        </div>

        <button className="link">Resend OTP</button>

        <div className="btn-container">
          <Button
            title={"Submit"}
            className="w-100"
            onClick={handleVerification}
          />
        </div>
      </FormBox>
    </FormContainer>
  );
};

export default Otp;
