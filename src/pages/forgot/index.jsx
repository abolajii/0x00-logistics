import Otp from "./otp";
import Password from "./password";
import React from "react";
import Verify from "./verify";

const ForgotPassword = () => {
  //   return <div>ForgotPassword</div>;

  const [steps, setSteps] = React.useState(1);
  const [email, setEmail] = React.useState("");

  switch (steps) {
    case 2:
      return (
        <div>
          <Otp length={6} email={email} setSteps={setSteps} />
        </div>
      );
    case 3:
      return (
        <div>
          <Password email={email} />
        </div>
      );

    default:
      return (
        <div>
          <Verify setSteps={setSteps} email={email} setEmail={setEmail} />
        </div>
      );
  }
};

export default ForgotPassword;
