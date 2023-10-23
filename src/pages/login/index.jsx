import { Error, FormBox, FormContainer, Input, LinkText } from "./styles";

import { Button } from "../../components";
import axios from "axios";
// import React from "react";
import { useLogin } from "./hook/useLogin";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const Login = () => {
  const { formValues, setFormValue, clicked, setClicked, setLoggedInUser } =
    useLogin();

  const navigate = useNavigate();

  const loginUser = async (data) => {
    return axios.post(`${url}/login/user`, { data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    // You can handle the login logic here

    const finalData = {
      usernameOrEmail: formValues.username,
      password: formValues.password,
    };
    try {
      const response = await loginUser(finalData);
      setLoggedInUser(response.data);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <h2>Welcome to Logistic Manager</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <div className="label">Email or username:</div>
            <Input
              type="text"
              placeholder="Username or Email"
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
              title="Login"
              type="submit"
              onClick={() => {
                setClicked(true);
              }}
            >
              Login
            </Button>
          </div>

          <div className="flex ai-center justify-between">
            <div>
              <LinkText to="/forgot">Forgot password? </LinkText>
            </div>
            <div>
              <LinkText to="/register">Create an account ?</LinkText>
            </div>
          </div>

          {/* 
          <LinkText to="/register">Don't have an account? Register</LinkText> */}
        </form>
      </FormBox>
    </FormContainer>
  );
};

export default Login;
