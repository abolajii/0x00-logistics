import Otp from "./otp";
import React from "react";
import Verify from "./verify";

const ForgotPassword = () => {
  //   return <div>ForgotPassword</div>;

  const [steps, setSteps] = React.useState(2);

  switch (steps) {
    case 2:
      return (
        <div>
          <Otp />
        </div>
      );

    default:
      return (
        <div>
          <Verify setSteps={setSteps} />
        </div>
      );
  }
};

export default ForgotPassword;
