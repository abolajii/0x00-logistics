/* eslint-disable react/prop-types */
import { Button } from "../../components";
import { LMNoAuth } from "../../service/api.service";
import React from "react";
import styled from "styled-components";
import useAlertStore from "../../hook/useAlertStore";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useNavigate } from "react-router-dom";

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
  }import useModalStore from '../../components/loading/hook/useModalStore';


  h2 {
    text-align: center;
    margin: 20px 0;
  }

  .btn-container {
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

const Error = styled.div`
  margin: 3px 0;
  color: red;
  font-size: 12px;
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

const Password = ({ email }) => {
  const [password, setPassword] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");

  const navigate = useNavigate();

  const { openModal, closeModal } = useModalStore();

  const { setSuccess, setError } = useAlertStore();

  const [clicked, setClicked] = React.useState(false);
  const [isMatch, setIsMatch] = React.useState(true);

  const changePassword = async (data) => {
    return LMNoAuth.post("/change/password", data);
  };

  React.useEffect(() => {
    if (cPassword === password) {
      setIsMatch(true);
    }
  }, [cPassword, password]);

  const handlePasswordChange = async () => {
    setClicked(true);

    if (!password || !cPassword) {
      return;
    }

    if (cPassword !== password) {
      setIsMatch(false);
      return;
    }

    openModal();

    try {
      const response = await changePassword({ email, password });
      setSuccess(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      closeModal();
    }
  };
  return (
    <FormContainer>
      <FormBox>
        <h2> Set Password</h2>
        <p className="small-text center">Set your password. Keep it safe.</p>

        <div>
          <div className="label">Password</div>
          <Input
            style={{
              borderColor: clicked && !password ? "red" : "#ccc",
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password === "" && clicked && <Error>This field is required</Error>}
        </div>
        <div>
          <div className="label">Confirm Password</div>
          <Input
            style={{
              borderColor: clicked && !cPassword ? "red" : "#ccc",
            }}
            type="password"
            placeholder="Confirm Password"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          {cPassword === "" && clicked && <Error>This field is required</Error>}
          {!isMatch && <Error>Passwords do not match</Error>}
        </div>
        <div className="btn-container">
          <Button
            title={"Save changes"}
            className="w-100"
            onClick={handlePasswordChange}
          />
        </div>
      </FormBox>
    </FormContainer>
  );
};

export default Password;
