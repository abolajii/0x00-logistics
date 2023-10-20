/* eslint-disable react/prop-types */
import styled from "styled-components";

const ButtonContainer = styled.button`
  background-color: #426b69;
  color: #fff;
  padding: 12px;
  display: inline-flex;
  padding: 10px 39px;
  border-radius: 4px;
  font-family: Lato;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a605d; /* Adjust the color for the hover effect */
  }

  &:active {
    background-color: #36544f; /* Adjust the color for the active effect */
  }
`;

const Button = ({ title, onClick, type }) => {
  return (
    <ButtonContainer onClick={onClick} type={type}>
      {title}
    </ButtonContainer>
  );
};

export default Button;
