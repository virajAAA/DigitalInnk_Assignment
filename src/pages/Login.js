import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { Button, Card } from "../components";
import * as yup from "yup";
import firebase from "firebase";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0efef;
`;

const ErrorMessage = styled.p`
  color: rgb(201, 69, 69);
  font-size: 16px;
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email("Must be the valid email")
    .required("Required*"),
  password: yup.string().required("Required*"),
});

const Login = () => {
  const history = useHistory();
  const [authenticationError, setAuthenticationError] = useState("");
  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        history.push("/Dashboard");
      })
      .catch((error) => {
        if (error.message) {
          setAuthenticationError(error.message);
        } else {
          setAuthenticationError("Something went wrong, please try again!");
        }
      });
  };

  return (
    <ContainerWrapper>
      <Card>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>
                <label>Email</label>
              </p>
              <p>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  ref={register}
                />
              </p>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>

            <div>
              <p>
                <label>Password</label>
              </p>
              <p>
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  ref={register}
                />
              </p>
              <ErrorMessage className="messages">
                {errors.password?.message}
              </ErrorMessage>
            </div>
            {authenticationError && <span>{authenticationError}</span>}
            <div>
              <Button type="submit" centerAlign>
                Login
              </Button>
            </div>
            <p>{errors.message}</p>
          </form>
        </div>
      </Card>
    </ContainerWrapper>
  );
};

export default Login;
