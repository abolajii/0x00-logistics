import { Details, Inner } from "./styles";

// import React from "react";
import Header from "../header";
/* eslint-disable react/prop-types */
import Sidebar from "../sidebar";

const Container = ({ children, title }) => {
  return (
    <Inner>
      <Sidebar />
      <Details>
        <Header title={title} />
        {children}
      </Details>
    </Inner>
  );
};

export default Container;
