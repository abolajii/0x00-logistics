import styled from "styled-components";

const ClientForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;

  div.field {
    display: flex;
    flex-direction: column;
    /* margin: 10px 0; */
  }

  label {
    margin: 10px 0;
  }
  input {
    width: 350px; /* Set a fixed width for the input fields */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.2s;
    transition: border-color 0.2s;
    &:focus,
    &:hover,
    &:active {
      border-color: #3a605d;
    }

    &::placeholder {
      font-family: Lato;
    }
  }

  button {
    background-color: #426b69;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 350px; /* Set a fixed width for the input fields */
    margin-top: 30px;

    transition: background-color 0.2s;
    &:hover {
      background-color: #3a605d; /* Adjust the color for the hover effect */
    }

    &:active {
      background-color: #36544f; /* Adjust the color for the active effect */
    }
  }

  .error {
    margin-top: 4px;
    color: red;
    font-size: 12px;
  }
`;

const ClientDetails = styled.div`
  h2 {
    margin-bottom: 14px;
  }
`;

const ValueBox = styled.div`
  background: #f0f0f0; /* Background color */
  border: 1px solid #ccc; /* Border */
  border-radius: 4px; /* Rounded corners */
  padding: 0 10px;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 300px;
`;

export { ClientForm, ValueBox, ClientDetails };
