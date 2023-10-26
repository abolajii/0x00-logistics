import { Error, FormBox, FormContainer, Input, LinkText } from "./styles";

import { Button } from "../../components";
import { LMNoAuth } from "../../service/api.service";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./hook/useRegister";

const Registration = () => {
  const { formValues, setFormValue, clicked, setClicked } = useRegister();

  const navigate = useNavigate();

  const createUser = async (data) => {
    return LMNoAuth.post(`/create/user`, { data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    // You can handle the registration logic here
    try {
      await createUser(formValues);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <h2>Register a new business</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <div className="label">Username:</div>
            <Input
              type="text"
              placeholder="Username"
              value={formValues.username}
              onChange={(e) => setFormValue("username", e.target.value)}
              required
              style={{
                borderColor: clicked && !formValues.username ? "red" : "#ccc",
              }}
            />
            {formValues.username === "" && clicked && (
              <Error>This field is required</Error>
            )}
          </div>
          <div>
            <div className="label">Email:</div>
            <Input
              type="email"
              placeholder="email"
              value={formValues.email}
              onChange={(e) => setFormValue("email", e.target.value)}
              required
              style={{
                borderColor: clicked && !formValues.email ? "red" : "#ccc",
              }}
            />
            {formValues.email === "" && clicked && (
              <Error>This field is required</Error>
            )}
          </div>
          <div>
            <div className="label">Business name:</div>
            <Input
              type="text"
              placeholder="Business name"
              value={formValues.businessName}
              onChange={(e) => setFormValue("businessName", e.target.value)}
              required
              style={{
                borderColor:
                  clicked && !formValues.businessName ? "red" : "#ccc",
              }}
            />
            {formValues.businessName === "" && clicked && (
              <Error>This field is required</Error>
            )}
          </div>
          <div>
            <div className="label">Password:</div>
            <Input
              type="password"
              placeholder="Password"
              value={formValues.password}
              onChange={(e) => setFormValue("password", e.target.value)}
              required
              style={{
                borderColor: clicked && !formValues.password ? "red" : "#ccc",
              }}
            />
            {formValues.password === "" && clicked && (
              <Error>This field is required</Error>
            )}
          </div>
          <div className="btn-container">
            <Button
              className="w-100"
              title="Register"
              type="submit"
              onClick={() => {
                setClicked(true);
              }}
            >
              Login
            </Button>
          </div>

          <div className="center">
            <LinkText to="/login">Login ?</LinkText>
          </div>

          {/* 
          <LinkText to="/register">Don't have an account? Register</LinkText> */}
        </form>
      </FormBox>
    </FormContainer>
  );
};

export default Registration;
