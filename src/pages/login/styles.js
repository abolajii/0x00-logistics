import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    margin-top: 20px;
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
  margin-top: 3px;
  color: red;
  font-size: 12px;
`;

const LinkText = styled(Link)`
  color: #3a605d;
  text-decoration: none;
  margin-top: 10px;
`;

export { Container, Input, FormBox, FormContainer, LinkText, Error };
