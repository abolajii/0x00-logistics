import { ClientDetails, ClientForm, ValueBox } from "./styles";

import { Container } from "../../components";
import { Small } from "../../components";
import axios from "axios";
import { useClient } from "./hook/useClient";
import useModalStore from "../../components/loading/hook/useModalStore";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const CreateClient = () => {
  const { formValues, setFormValue, clicked, setClicked } = useClient();

  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleClientSubmit = (e) => {
    e.preventDefault();
    setClicked(true); // Set clicked to true to display errors

    // Check if the fields are filled
    if (!formValues.name || !formValues.phone) {
      return;
    } else {
      openModal();

      setClicked(false); // Reset clicked to false
      // Handle form submission here
      submitClient();
    }
  };

  const createClient = async (data) => {
    return axios.post(`${url}/create/client`, { data });
  };

  const submitClient = async () => {
    try {
      await createClient(formValues);
      navigate("/clients");
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <Container title="Clients">
      <Small title="New Client" />
      <div className="flex">
        <div className="flex-1">
          <ClientForm>
            <div className="field">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Name"
                value={formValues.name}
                onChange={(e) => setFormValue("name", e.target.value)}
                required
                style={{
                  borderColor: clicked && !formValues.name ? "red" : "#ccc",
                }}
              />
              {formValues.name === "" && clicked && (
                <div className="error">This field is required</div>
              )}
            </div>
            <div className="field">
              <label>Phone:</label>
              <input
                type="text"
                placeholder="0808 888 3333"
                value={formValues.phone}
                onChange={(e) => setFormValue("phone", e.target.value)}
                required
                style={{
                  borderColor: clicked && !formValues.phone ? "red" : "#ccc",
                }}
              />
              {formValues.phone === "" && clicked && (
                <div className="error">This field is required</div>
              )}
            </div>
            <button type="submit" onClick={handleClientSubmit}>
              Create Client
            </button>
          </ClientForm>
        </div>
        <ClientDetails className="flex-1">
          <h2>Client Details</h2>
          <div className="field">
            <p>Client Name</p>
            <ValueBox>{formValues.name}</ValueBox>
          </div>
          <div className="field">
            <p>Phone number</p>
            <ValueBox>{formValues.phone}</ValueBox>
          </div>
        </ClientDetails>
      </div>
    </Container>
  );
};

export default CreateClient;
