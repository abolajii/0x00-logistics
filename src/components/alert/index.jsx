import Error from "./ErrorAlert";
// import React from "react";
import Success from "./SuccessAlert";
import Todo from "../dropdown";

const Alert = () => {
  return (
    <div>
      <Error />
      <Success />
      <Todo />
    </div>
  );
};

export default Alert;
