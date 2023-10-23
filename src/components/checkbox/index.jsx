/* eslint-disable react/prop-types */
// import React, { useState } from 'react';

import styled from "styled-components";

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin: 0 !important;

  p {
    margin-right: 20px;
    font-family: Lato;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const Icon = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${(props) => `${props.bgColor}`};
  /* border-radius: 50%; */
  margin-right: 8px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: ${(props) =>
    props.checked ? props.bgColor : "transparent"};
  /* border: ${(props) =>
    props.checked ? "2px solid #000" : "2px solid #999"}; */
  /* border-radius: 50%; */
`;

const CustomCheckbox = ({ label, value, checkedValue, onChange }) => {
  const labelBgColors = {
    void: "#777777",
    done: "#2ca764",
    pending: "#e1b000",
    paid: "#007f5f",
    "not-paid": "#e53b3b",
    canceled: "#ff7a7a",
    "next-day": "#ffcc00",
    "Pick up": "#ff3323",
    delivery: "#e21122",
    single: "#007bff",
    multiple: "#4CAF50",
    // Add more background colors for other labels here
  };
  const isChecked = value === checkedValue;

  const handleChange = () => {
    onChange(value);
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      <Icon bgColor={labelBgColors[value]}>
        <StyledCheckbox checked={isChecked} bgColor={labelBgColors[value]} />
      </Icon>
      <p>{label}</p>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
