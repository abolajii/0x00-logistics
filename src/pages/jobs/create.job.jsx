/* eslint-disable no-unused-vars */
import { Box, Form } from "./styles";
import {
  Button,
  Container,
  CustomCheckbox,
  NavHeader,
  Small,
} from "../../components";

import { BiSolidUpArrow } from "react-icons/bi";
import Dropdown from "./components/dropdown";
import FileUploadComponent from "./file.upload";
import JobDetails from "./job.details";
import { LMAuth } from "../../service/api.service";
import React from "react";
import { clsx } from "clsx";
import useAlertStore from "../../hook/useAlertStore";
import { useClient } from "../clients/hook/useClient";
import { useJobStore } from "./hook/useJob";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useNavigate } from "react-router-dom";

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

  React.useEffect(() => {
    setClicked(false);
  }, [setClicked]);

  const [isRotated, setIsRotated] = React.useState(false);

  const [maxLocationsReached, setMaxLocationsReached] = React.useState(false);

  const [jobType, setJobType] = React.useState("single"); // State to track multiple expense mode

  const [file, setFile] = React.useState(null);

  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const { setError } = useAlertStore();

  const { setClients, clients } = useClient();

  const getAllClients = async () => {
    return await LMAuth.get(`/clients`);
  };

  React.useEffect(() => {
    const allClients = async () => {
      try {
        const response = await getAllClients();
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allClients();
  }, [setClients]);

  const handleNext = () => {
    setClicked(true);
    if (jobType === "multiple") {
      if (
        !formValues.customerName ||
        !formValues.pickUp ||
        deliveryLocations[0].delivery === ""
      ) {
        return;
      }
      setClicked(false);
    } else {
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
    setStep(1);
  };

  const createJob = async (data) => {
    return LMAuth.post(`/create/job`, { data });
  };

  const submitJob = async (e) => {
    let finalData;
    setClicked(true);
    e.preventDefault();

    if (
      jobType === "multiple" &&
      (!formValues.customerName ||
        !formValues.pickUp ||
        !formValues.payer ||
        deliveryLocations[0].delivery == "")
    ) {
      return;
    }

    if (
      jobType === "single" &&
      (!formValues.customerName ||
        !formValues.pickUp ||
        !formValues.delivery ||
        !formValues.amount ||
        !formValues.payer)
    ) {
      return;
    }

    openModal();
    const { amount, delivery, ...noAmount } = formValues;

    if (jobType === "multiple") {
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
      handlePrev();
      setClicked(false);
      setFormValue("customerName", "");
      setFormValue("pickUp", "");
      setFormValue("delivery", "");
      setFormValue("amount", "");
      setFormValue("payer", "");

      setDeliveryLocations([{ amount: 0, delivery: "" }]);
      navigate("/jobs");
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  const handleUpload = async () => {
    const acceptedFiles = ["xlsx"];
    // Create a FormData object
    const formData = new FormData();
    setClicked(true);
    if (!formValues.customerName || !formValues.pickUp || !file) return;

    openModal();

    try {
      // Append customer name and pick-up location
      formData.append("customerName", formValues.customerName);
      formData.append("pickUp", formValues.pickUp);
      formData.append("file", file);

      await LMAuth.post("/upload", formData);
      handlePrev();
      navigate("/jobs");
      setFormValue("customerName", "");
      setFormValue("pickUp", "");
      setClicked(false);
    } catch (error) {
      setError(error.response.data.error);
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

  const handleJobTypeChange = (value) => {
    setJobType(value);
  };

  return (
    <Container title="Job">
      <Small title="New Job" />
      <NavHeader titleOne="Jobs" path="/jobs" titleTwo={"New Job"} />

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
                    {clients.length > 0 && (
                      <div
                        onClick={handleIconClick}
                        className={clsx(
                          `icon center cursor`,
                          isRotated && "rotated"
                        )}
                      >
                        <BiSolidUpArrow size={10} />
                      </div>
                    )}
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
                    <CustomCheckbox
                      value="single"
                      label="Single"
                      checkedValue={jobType}
                      onChange={handleJobTypeChange}
                    />
                    <CustomCheckbox
                      value="multiple"
                      label="Multiple"
                      checkedValue={jobType}
                      onChange={(val) => handleJobTypeChange(val)}
                    />
                    <CustomCheckbox
                      value="file"
                      label="File upload"
                      checkedValue={jobType}
                      onChange={(val) => handleJobTypeChange(val)}
                    />
                  </div>
                </div>

                {jobType === "multiple" ? (
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
                ) : jobType === "single" ? (
                  <div className="field">
                    <label>Delivery Location:</label>
                    <input
                      type="text"
                      value={formValues.delivery}
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
                ) : null}

                {jobType === "file" && (
                  <FileUploadComponent
                    file={file}
                    setFile={setFile}
                    noFile={clicked && !file}
                  />
                )}
              </>
            )}
            {step === 2 && (
              <>
                {jobType === "multiple" &&
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
                {jobType !== "multiple" && (
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
                  <div className="flex">
                    <CustomCheckbox
                      value="Pick up"
                      onChange={(e) => setFormValue("payer", e)}
                      required
                      label="Pick up"
                      checkedValue={formValues.payer}
                    />
                    <CustomCheckbox
                      value="delivery"
                      onChange={(e) => setFormValue("payer", e)}
                      required
                      label="Delivery"
                      checkedValue={formValues.payer}
                    />
                  </div>

                  {/* <input
                    type="text"
                    value={formValues.payer}
                    onChange={(e) => setFormValue("payer", e.target.value)}
                    required
                    style={{
                      borderColor:
                        clicked && !formValues.payer ? "red" : "#ccc",
                    }}
                  /> */}
                  {formValues.payer === "" && clicked && (
                    <div className="error">This field is required</div>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-between btn-container">
              {jobType === "file" ? (
                <div>
                  <Button onClick={handleUpload} title="Create" />
                </div>
              ) : step === 1 ? (
                <div>
                  <Button onClick={handleNext} title="Next" />
                </div>
              ) : (
                <div>
                  <Button onClick={handlePrev} title="Prev" />
                </div>
              )}

              {step === 2 && (
                <Button type="submit" onClick={submitJob} title={"Create"} />
              )}
            </div>
          </Form>
        </Box>
        {/*  */}

        <div className="flex-1">
          <JobDetails
            multipleJobs={jobType === "multiple"}
            file={jobType === "file"}
          />
        </div>
      </div>
    </Container>
  );
};

export default CreateJob;
