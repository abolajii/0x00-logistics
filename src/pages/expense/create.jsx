/* eslint-disable no-unused-vars */
import { Box, ExpenseContainer, ExpenseForm, ValueBox } from "./styles";
import { Button, Container, CustomCheckbox, Small } from "../../components";

import { MdDelete } from "react-icons/md";
import QuickClick from "./quick.click";
import RadioButton from "./radiobutton";
import React from "react";
import axios from "axios";
import { formatBalance } from "../../helper";
import { useExpense } from "./hook/useExpense";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const CreateExpense = () => {
  const {
    formValues,
    setFormValue,
    clicked,
    setClicked,
    setMultipleExpenses,
    multipleExpenses,
  } = useExpense();
  const [multipleExpense, setMultipleExpense] = React.useState(false); // State to track multiple expense mode

  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    setClicked(true); // Set clicked to true to display errors

    // Check if the fields are filled
    if (!formValues.expense || !formValues.amount) {
      return;
    } else {
      setClicked(false); // Reset clicked to false
      // Handle form submission here
      submitExpense(openModal);
    }
  };

  const createExpense = async (data) => {
    return axios.post(`${url}/create/expense`, { data });
  };

  const submitExpense = async (openModal) => {
    if (multipleExpense) {
      const newExpense = {
        id: multipleExpenses.length + 1,
        expense: formValues.expense,
        amount: formValues.amount,
      };
      const cloneExpense = [...multipleExpenses, newExpense];
      setMultipleExpenses(cloneExpense);
    } else {
      openModal();
      try {
        await createExpense([formValues]);
        navigate("/expense");
      } catch (error) {
        console.log(error);
      } finally {
        closeModal();
      }
    }
  };

  const submitMultipleExpense = async () => {
    openModal();
    // remove id from multipleExpenses before sending
    const expensesWithoutId = multipleExpenses.map(
      ({ id, ...expense }) => expense
    );
    try {
      await createExpense(expensesWithoutId);
      navigate("/expense");
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <Container title="Expense">
      <Small title="New Expense" />

      <div className="flex">
        <div className="flex-1">
          <ExpenseForm>
            <div className="field">
              <label>Expense:</label>
              <input
                type="text"
                placeholder="Expense"
                value={formValues.expense}
                onChange={(e) => setFormValue("expense", e.target.value)}
                required
                style={{
                  borderColor: clicked && !formValues.expense ? "red" : "#ccc",
                }}
              />
              {formValues.expense === "" && clicked && (
                <div className="error">This field is required</div>
              )}
            </div>
            <div className="field">
              <label>Amount:</label>
              <input
                type="text"
                placeholder="Amount"
                value={formValues.amount}
                onChange={(e) => setFormValue("amount", e.target.value)}
                required
                style={{
                  borderColor: clicked && !formValues.amount ? "red" : "#ccc",
                }}
              />
              {formValues.amount === "" && clicked && (
                <div className="error">This field is required</div>
              )}
            </div>
            {/*  */}
            {/* Add a radio button here for either a single expense or multiple expenses*/}
            {/* Radio buttons for single/multiple expense */}
            <div className="field">
              <label>Expense Type:</label>
              <div className="flex">
                <CustomCheckbox
                  value="single"
                  label="Single"
                  checkedValue={multipleExpense ? "multiple" : "single"}
                  onChange={(value) => setMultipleExpense(value === "multiple")}
                />
                <CustomCheckbox
                  value="multiple"
                  label="Multiple"
                  checkedValue={multipleExpense ? "multiple" : "single"}
                  onChange={(value) => setMultipleExpense(value === "multiple")}
                />
              </div>
            </div>
            {/*  */}
            <button type="submit" onClick={handleExpenseSubmit}>
              {multipleExpense ? "Add Expense" : "Create Expense"}
            </button>
          </ExpenseForm>
        </div>
        <div className="flex-1">
          <h2>Expense Details</h2>
          {multipleExpense && multipleExpenses.length > 0 && (
            <div>
              <ExpenseContainer>
                <div className="width">
                  {multipleExpenses.map((expense, i) => {
                    return (
                      <div className="flex ai-center justify-between" key={i}>
                        <div className="flex ai-center gap">
                          <p>{expense.expense}</p>
                          <p>{expense.amount}</p>
                        </div>
                        <div
                          className="cursor"
                          onClick={() => {
                            const filterExpense = multipleExpenses.filter(
                              (e) => e.id !== expense.id
                            );

                            setMultipleExpenses(filterExpense);
                          }}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-100 center">
                  <Button
                    title="Create"
                    className="w-100"
                    onClick={submitMultipleExpense}
                  />
                </div>
              </ExpenseContainer>
            </div>
          )}

          {!multipleExpense && (
            <>
              <Box>
                <p>Expense</p>
                <ValueBox>{formValues.expense}</ValueBox>
              </Box>
              <Box>
                <p>Amount</p>
                <ValueBox>
                  {formValues.amount !== "" &&
                    formatBalance(Number(formValues.amount))}
                </ValueBox>
              </Box>
            </>
          )}
        </div>
      </div>

      {/*  */}
      <QuickClick />
      {/*  */}
    </Container>
  );
};

export default CreateExpense;
