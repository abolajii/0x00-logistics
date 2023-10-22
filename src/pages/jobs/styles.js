import styled from "styled-components";

const GoBack = styled.button`
  text-decoration: underline;
  font-family: Lato;
`;

const Box = styled.div`
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 90px 4px; */
  /* border-radius: 20px; */
  height: 400px;
  /* padding: 20px; */
  font-family: Lato;
`;

const Form = styled.form`
  width: 500px; /* Set a fixed width for the input fields */

  .btn-container {
    margin-top: 40px;
  }

  div.field {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    position: relative;
  }
  label {
    margin: 10px 0;
  }

  .input-container {
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.2s;
    input {
      border: none;
    }

    .icon {
      height: 20px;
      width: 20px;
      transform: rotate(0deg);
    }
    .rotated {
      transform: rotate(180deg);
    }
  }
  input {
    /* width: 350px; Set a fixed width for the input fields */
    padding: 10px;
    width: 500px; /* Set a fixed width for the input fields */
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.2s;
    &::placeholder {
      font-family: Lato;
    }
  }
  input:focus,
  input:hover,
  input:active {
    border-color: #0077ff;
  }

  .error {
    margin-top: 4px;
    color: red;
    font-size: 12px;
  }
`;

const JobDetailsContainer = styled.div`
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 90px 4px; */
  border-radius: 20px;
  min-height: 400px;
  /* padding: 20px; */
  font-family: Lato;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  /* Style the strong element within p */
  p strong {
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    margin: 10px 0;
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
  width: 300px;
`;

export { GoBack, Form, JobDetailsContainer, Box, ValueBox };
