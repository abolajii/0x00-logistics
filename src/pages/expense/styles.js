import styled from "styled-components";

const MaintenanceContainer = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px;
  padding: 10px;

  &:hover {
    background-color: #f5f5f5;
    transition: background-color 0.2s;
  }

  h2 {
    font-size: 15px;
    margin: 16px 0;
  }
`;

const MaintenanceItem = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  font-size: 14px;
`;

const ItemTitle = styled.p`
  font-size: 12px;
  margin-right: 4px;
`;

const Amount = styled.p`
  font-weight: bold;
  font-size: 12px;
`;

const TotalExpenses = styled.p`
  font-weight: bold;
  font-size: 13px;
  margin-top: 10px;
`;

const ExpenseForm = styled.form`
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

export {
  MaintenanceContainer,
  MaintenanceItem,
  ItemTitle,
  Amount,
  TotalExpenses,
  ExpenseForm,
};
