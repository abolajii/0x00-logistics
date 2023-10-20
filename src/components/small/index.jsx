/* eslint-disable react/prop-types */
// import React from 'react'
import styled from "styled-components";
const SmallTitle = styled.p`
  color: #426b69;
  font-family: Lato;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
`;

const Small = ({ title }) => {
  return <SmallTitle>{title}</SmallTitle>;
};

export default Small;
