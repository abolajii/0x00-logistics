import { JobDetailsContainer, ValueBox } from "./styles";

import { useJobStore } from "./hook/useJob";

const JobDetails = () => {
  const { formValues } = useJobStore();

  return (
    <JobDetailsContainer>
      <h2>Job Details</h2>
      <div className="field">
        <p>Customer Name</p>
        <ValueBox>{formValues.customerName}</ValueBox>
      </div>
      <div className="field">
        <p>Pickup Location</p>
        <ValueBox>{formValues.pickUp}</ValueBox>
      </div>
      <div className="field">
        <p>Delivery Location</p>
        <ValueBox>{formValues.delivery}</ValueBox>
      </div>
      <div className="field">
        <p>Amount</p>
        <ValueBox>{formValues.amount}</ValueBox>
      </div>

      <div className="field">
        <p>Who Is Paying</p>
        <ValueBox>{formValues.payer}</ValueBox>
      </div>
    </JobDetailsContainer>
  );
};

export default JobDetails;
