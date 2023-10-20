import { Container, Small } from "../../components";

import { ExpenseForm } from "./styles";
import axios from "axios";
import { useExpense } from "./hook/useExpense";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const CreateExpense = () => {
  const { formValues, setFormValue, clicked, setClicked } = useExpense();

  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    setClicked(true); // Set clicked to true to display errors

    // Check if the fields are filled
    if (!formValues.expense || !formValues.amount) {
      return;
    } else {
      openModal();

      setClicked(false); // Reset clicked to false
      // Handle form submission here
      submitExpense();
    }
  };

  const createExpense = async (data) => {
    return axios.post(`${url}/create/expense`, { data });
  };

  const submitExpense = async () => {
    try {
      await createExpense(formValues);
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
        <button type="submit" onClick={handleExpenseSubmit}>
          Create Expense
        </button>
      </ExpenseForm>
    </Container>
  );
};

export default CreateExpense;
