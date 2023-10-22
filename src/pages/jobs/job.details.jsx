/* eslint-disable react/prop-types */
import { JobDetailsContainer, ValueBox } from "./styles";

import { formatBalance } from "../../helper";
import { useJobStore } from "./hook/useJob";

const JobDetails = ({ multipleJobs }) => {
  const { formValues, deliveryLocations } = useJobStore();

  // Extract the delivery location names into an array
  const deliveryNames = deliveryLocations
    .filter((location) => location.delivery && location.delivery.trim() !== "")
    .map((location) => location.delivery);

  // Calculate the total amount from the deliveryLocations array
  const totalAmount = deliveryLocations.reduce((total, location) => {
    // Parse the amount as a float and add it to the total
    const locationAmount = parseFloat(location.amount);
    if (!isNaN(locationAmount)) {
      return total + locationAmount;
    }
    return total;
  }, 0);

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
        {multipleJobs ? <p>Delivery Location(s) </p> : <p>Delivery Location</p>}
        {multipleJobs ? (
          <ValueBox>{deliveryNames.join(", ")}</ValueBox>
        ) : (
          <ValueBox>{formValues.delivery || deliveryNames[0]}</ValueBox>
        )}
      </div>
      <div className="field">
        <p>Amount</p>

        <ValueBox>
          {multipleJobs ? (
            <div>{totalAmount > 0 && formatBalance(totalAmount)}</div>
          ) : (
            <div>
              {formValues.amount !== "" &&
                formatBalance(Number(formValues.amount))}
            </div>
          )}
        </ValueBox>
      </div>

      <div className="field">
        <p>Who Is Paying</p>
        <ValueBox>{formValues.payer}</ValueBox>
      </div>
    </JobDetailsContainer>
  );
};

export default JobDetails;
