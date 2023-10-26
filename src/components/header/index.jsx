/* eslint-disable react/prop-types */
// import React from "react";

import { Inner } from "./styles";
import { useLogin } from "../../pages/login/hook/useLogin";

const Header = ({ title }) => {
  const { loggedInUser } = useLogin();
  return (
    <Inner>
      <p className="title">{title}</p>
      <p className="business-name">
        {loggedInUser.username || "aquad errands"}
      </p>
    </Inner>
  );
};

export default Header;
