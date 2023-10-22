import { Box, Form } from "./styles";
import { Button, Container, Small } from "../../components";

import { BiSolidUpArrow } from "react-icons/bi";
import Dropdown from "./components/dropdown";
import JobDetails from "./job.details";
import React from "react";
import axios from "axios";
import { clsx } from "clsx";
import { useJobStore } from "./hook/useJob";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const CreateJob = () => {
  const { step, setStep, formValues, setFormValue, clicked, setClicked } =
    useJobStore();

  const [isRotated, setIsRotated] = React.useState(false);

  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleSubmit = (e, step) => {
    e.preventDefault();
    if (step === 1) {
      setClicked(true);
      if (
        !formValues.customerName ||
        !formValues.pickUp ||
        !formValues.delivery
      ) {
        return;
      } else {
        setStep(2);
        setClicked(false);
      }
    } else {
      setStep(1);
      setClicked(false);
    }
  };

  const createJob = async (data) => {
    return axios.post(`${url}/create/job`, { data });
  };

  const submitJob = async (e) => {
    setClicked(true);

    if (
      !formValues.customerName ||
      !formValues.pickUp ||
      !formValues.amount ||
      !formValues.payer
    ) {
      return;
    }

    e.preventDefault();
    openModal();

    try {
      await createJob(formValues);
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

  return (
    <Container title="Job">
      <Small title="New Job" />
      <div className="flex justify-between gap-3">
        <Box className="flex-1">
          <Form>
            {step === 1 && (
              <>
                <div className="field">
                  <label>Customer Name:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      value={formValues.customerName}
                      onChange={(e) =>
                        setFormValue("customerName", e.target.value)
                      }
                      required
                      placeholder="Customer name"
                      style={{
                        borderColor:
                          clicked && !formValues.customerName ? "red" : "#ccc",
                      }}
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
                  <label>Delivery Location:</label>
                  <input
                    type="text"
                    placeholder="Delivery"
                    value={formValues.delivery}
                    onChange={(e) => setFormValue("delivery", e.target.value)}
                    required
                    style={{
                      borderColor:
                        clicked && !formValues.delivery ? "red" : "#ccc",
                    }}
                  />
                  {formValues.delivery === "" && clicked && (
                    <div className="error">This field is required</div>
                  )}
                </div>
              </>
            )}
            {step === 2 && (
              <>
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
              <Button
                type="submit"
                onClick={(e) =>
                  handleSubmit(e, step, step === 1 ? "Next" : "Prev")
                }
                title={step === 1 ? "Next" : "Prev"}
              />

              {step === 2 && (
                <Button type="submit" onClick={submitJob} title={"Create"} />
              )}
            </div>
          </Form>
        </Box>
        <div className="flex-1">
          <JobDetails />
        </div>
      </div>
    </Container>
  );
};

export default CreateJob;
