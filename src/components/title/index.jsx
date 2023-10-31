/* eslint-disable react/prop-types */
// import React from "react";
import { colors } from "../../constants";
import styled from "styled-components";

const Text = styled.p`
  color: ${colors.black};
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
  margin: 10px 0;

  &.red {
    color: ${colors.darkColor};
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const Title = ({ text, color }) => {
  if (color) {
    return <Text className="red">{text}</Text>;
  }
  return <Text>{text}</Text>;
};

export default Title;
