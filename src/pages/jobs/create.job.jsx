/* eslint-disable no-unused-vars */
import { Box, Form } from "./styles";
import { Button, Container, Small } from "../../components";

import { BiSolidUpArrow } from "react-icons/bi";
import Dropdown from "./components/dropdown";
import JobDetails from "./job.details";
import RadioButton from "../expense/radiobutton";
import React from "react";
import axios from "axios";
import { clsx } from "clsx";
import { useJobStore } from "./hook/useJob";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const CreateJob = () => {
  // const [deliveryLocations, setDeliveryLocations] = React.useState([""]);

  const MAX_DELIVERY_LOCATIONS = 3; // Define the maximum number of delivery locations

  const {
    step,
    setStep,
    formValues,
    setFormValue,
    clicked,
    setClicked,
    deliveryLocations,
    setDeliveryLocations,
  } = useJobStore();

  const [isRotated, setIsRotated] = React.useState(false);

  const [maxLocationsReached, setMaxLocationsReached] = React.useState(false);

  const [multipleJobs, setMultipleJobs] = React.useState(false); // State to track multiple expense mode

  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleNext = () => {
    setClicked(true);
    if (multipleJobs) {
      if (
        !formValues.customerName ||
        !formValues.pickUp ||
        deliveryLocations[0].delivery === ""
      ) {
        return;
      }
      setClicked(false);
    } else {
      // console.log(formValues);
      // console.log(formValues);
      // setClicked(true)
      // formValues.delivery = deliveryLocations[0].delivery;
      if (
        !formValues.customerName ||
        !formValues.pickUp ||
        !formValues.delivery
      ) {
        return;
      }
      setClicked(false);
    }
    setStep(2);
  };

  const handlePrev = () => {
    if (multipleJobs) {
      setStep(1);
    }
    setStep(1);
  };

  // const handleSubmit = (e, step) => {
  //   //
  //   e.preventDefault();

  //   if (!multipleJobs) {
  //     if (step === 1) {
  //       formValues.delivery = deliveryLocations[0].delivery;
  //       setClicked(true);
  //       if (
  //         !formValues.customerName ||
  //         !formValues.pickUp ||
  //         !formValues.delivery
  //       ) {
  //         return;
  //       } else {
  //         formValues.amount = deliveryLocations[0].amount;

  //         setStep(2);
  //         setClicked(false);
  //       }
  //     } else {
  //       setStep(1);
  //       setClicked(false);
  //     }
  //   } else {
  //     if (step === 1) {
  //       setClicked(true);
  //       if (!formValues.customerName || !formValues.pickUp) {
  //         return;
  //       } else {
  //         setStep(2);
  //         setClicked(false);
  //       }
  //     } else {
  //       setStep(1);
  //       setClicked(false);
  //     }
  //   }
  // };

  const createJob = async (data) => {
    return axios.post(`${url}/create/job`, { data });
  };

  const submitJob = async (e) => {
    let finalData;
    setClicked(true);
    e.preventDefault();

    // openModal();
    const { amount, delivery, ...noAmount } = formValues;

    if (multipleJobs) {
      const formData = {
        ...noAmount,
        deliveryLocations,
      };
      finalData = formData;
    } else {
      finalData = formValues;
    }

    try {
      await createJob(finalData);
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  const handleIconClick = () => {
    // Toggle the rotation class
    setIsRotated((prev) => !prev);
  };

  const handleAddDeliveryLocation = () => {
    // setDeliveryLocations([...deliveryLocations, ""]);
    if (deliveryLocations.length < MAX_DELIVERY_LOCATIONS) {
      setDeliveryLocations([...deliveryLocations, { amount: 0, delivery: "" }]);
    } else {
      setMaxLocationsReached(true);
    }
  };

  const handleRemoveDeliveryLocation = (index) => {
    //
    if (maxLocationsReached) {
      setMaxLocationsReached(false);
    }
    const updatedLocations = [...deliveryLocations];
    updatedLocations.splice(index, 1);
    setDeliveryLocations(updatedLocations);
  };

  return (
    <Container title="Job">
      <Small title="New Job" />
      <div className="flex justify-between gap-3">
        {/*  */}
        <Box className="flex-1">
          <Form>
            {step === 1 && (
              <>
                <div className="field">
                  <label>Customer Name:</label>
                  <div
                    className="input-container"
                    style={{
                      borderColor:
                        clicked && !formValues.customerName ? "red" : "#ccc",
                    }}
                  >
                    <input
                      type="text"
                      value={formValues.customerName}
                      onChange={(e) =>
                        setFormValue("customerName", e.target.value)
                      }
                      required
                      placeholder="Customer name"
                    />
                    <div
                      onClick={handleIconClick}
                      className={clsx(
                        `icon center cursor`,
                        isRotated && "rotated"
                      )}
                    >
                      <BiSolidUpArrow size={10} />
                    </div>
                  </div>

                  {formValues.customerName === "" && clicked && (
                    <div className="error">This field is required</div>
                  )}
                  {isRotated && <Dropdown />}
                </div>
                <div className="field">
                  <label>Pickup Location:</label>
                  <input
                    type="text"
                    value={formValues.pickUp}
                    onChange={(e) => setFormValue("pickUp", e.target.value)}
                    required
                    placeholder="Pick up"
                    style={{
                      borderColor:
                        clicked && !formValues.pickUp ? "red" : "#ccc",
                    }}
                  />
                  {formValues.pickUp === "" && clicked && (
                    <div className="error">This field is required</div>
                  )}
                </div>
                <div className="field">
                  <label>Delivery Type:</label>
                  <div className="flex">
                    <RadioButton
                      value="Single"
                      selectedValue={multipleJobs ? "Multiple" : "Single"}
                      onSelect={(value) =>
                        setMultipleJobs(value === "Multiple")
                      }
                    />
                    <RadioButton
                      value="Multiple"
                      selectedValue={multipleJobs ? "Multiple" : "Single"}
                      onSelect={(value) =>
                        setMultipleJobs(value === "Multiple")
                      }
                    />
                  </div>
                </div>

                {multipleJobs ? (
                  <div>
                    <div className="field">
                      <label>Delivery Location(s):</label>
                      {deliveryLocations.map((location, index) => (
                        <div key={index} className="delivery-location flex">
                          <div className="flex flex-col">
                            <div>
                              <div className="flex ai-end">
                                <input
                                  type="text"
                                  value={location.delivery}
                                  onChange={(e) => {
                                    const updatedLocations = [
                                      ...deliveryLocations,
                                    ];
                                    updatedLocations[index].delivery =
                                      e.target.value;
                                    setDeliveryLocations(updatedLocations);
                                  }}
                                  required
                                  placeholder="Delivery"
                                  style={{
                                    borderColor:
                                      clicked && !location.delivery
                                        ? "red"
                                        : "#ccc",
                                  }}
                                />
                                <div className="flex">
                                  {index > 0 && (
                                    <div
                                      type="button"
                                      onClick={() =>
                                        handleRemoveDeliveryLocation(index)
                                      }
                                      className="button cursor"
                                    >
                                      -
                                    </div>
                                  )}
                                  <div
                                    type="button"
                                    onClick={handleAddDeliveryLocation}
                                    className="button cursor"
                                  >
                                    +
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              {location.delivery === "" && clicked && (
                                <div className="error">
                                  This field is required
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {maxLocationsReached && (
                        <div className="max-locations-reached">
                          You have reached the maximum limit of{" "}
                          {MAX_DELIVERY_LOCATIONS} delivery locations.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="field">
                    <label>Delivery Location:</label>
                    <input
                      type="text"
                      value={
                        formValues.delivery || deliveryLocations[0].delivery
                      }
                      onChange={(e) => setFormValue("delivery", e.target.value)}
                      required
                      placeholder="Delivery"
                      style={{
                        borderColor:
                          clicked && !formValues.delivery ? "red" : "#ccc",
                      }}
                    />
                    {formValues.delivery === "" && clicked && (
                      <div className="error">This field is required</div>
                    )}
                  </div>
                )}
              </>
            )}
            {step === 2 && (
              <>
                {multipleJobs &&
                  deliveryLocations.map((label, index) => (
                    <div className="field" key={index}>
                      <label>
                        Amount for <strong>{label.delivery}:</strong>
                      </label>
                      <input
                        type="text"
                        // You can replace this with a corresponding state variable
                        value={deliveryLocations[index].amount || ""}
                        onChange={(e) => {
                          const updatedLocations = [...deliveryLocations];
                          updatedLocations[index].amount = e.target.value;
                          setDeliveryLocations(updatedLocations);
                        }}
                        required
                        style={{
                          borderColor:
                            clicked && !deliveryLocations[index].amount
                              ? "red"
                              : "#ccc",
                        }}
                      />
                      {deliveryLocations[index].amount === 0 && clicked && (
                        <div className="error">This field is required</div>
                      )}
                    </div>
                  ))}
                {!multipleJobs && (
                  <div className="field">
                    <label>Amount:</label>
                    <input
                      type="text"
                      value={formValues.amount}
                      onChange={(e) => setFormValue("amount", e.target.value)}
                      required
                      style={{
                        borderColor:
                          clicked && !formValues.amount ? "red" : "#ccc",
                      }}
                    />
                    {formValues.amount === "" && clicked && (
                      <div className="error">This field is required</div>
                    )}
                  </div>
                )}

                <div className="field">
                  <label>Who Is Paying:</label>
                  <input
                    type="text"
                    value={formValues.payer}
                    onChange={(e) => setFormValue("payer", e.target.value)}
                    required
                    style={{
                      borderColor:
                        clicked && !formValues.payer ? "red" : "#ccc",
                    }}
                  />
                  {formValues.payer === "" && clicked && (
                    <div className="error">This field is required</div>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-between btn-container">
              {step === 1 ? (
                <div>
                  <Button onClick={handleNext} title="Next" />
                </div>
              ) : (
                <div>
                  <Button onClick={handlePrev} title="Prev" />
                </div>
              )}
              {/* <Button
                type="submit"
                onClick={(e) =>
                  handleSubmit(e, step, step === 1 ? "Next" : "Prev")
                }
                title={step === 1 ? "Next" : "Prev"}
              /> */}

              {step === 2 && (
                <Button type="submit" onClick={submitJob} title={"Create"} />
              )}
            </div>
          </Form>
        </Box>
        {/*  */}

        <div className="flex-1">
          <JobDetails multipleJobs={multipleJobs} />
        </div>
      </div>
    </Container>
  );
};

export default CreateJob;
