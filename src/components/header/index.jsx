/* eslint-disable react/prop-types */
// import React from "react";

import { Inner } from "./styles";

const Header = ({title}) => {
  return (
    <Inner>
      <p className="title">{title}</p>
      <p className="business-name">aquad errands</p>
    </Inner>
  );
};

export default Header;
