import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import firebase from "firebase";
import styled from "styled-components";

const LoginUi = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0efef;
`;

const LoginButton = styled.button`
  margin-left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 34px;
  border: none;
  outline: none;
  background-color: #4997fb;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  color: white;
  border-radius: 4px;
`;

const Input = styled.input`
  padding: 2px;
  width: 90%;
  font-size: 1rem;
  letter-spacing: 1px;
`;

const Container = styled.div`
  margin: auto;
  width: 400px;
  max-width: 90%;
`;

const FormDetails = styled.form`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  width:100%;
  height:100%
  background-color:white;
  border-radius:4px;
  border:1px solid sliver;
  margin:10px 0 18px 0;
  padding:0 10px;
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

function Login() {
  let history = useHistory();
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
        console.log("error>>>>>>", error.message);
      });
  };

  return (
    <LoginUi>
      <Container>
        <FormDetails onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <p>
              <label>Email</label>
            </p>
            <p>
              <Input
                className="input"
                name="email"
                type="email"
                placeholder="Email Address"
                ref={register}
              />
            </p>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <p>
              <label>Password</label>
            </p>
            <p>
              <Input
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
          </FormGroup>

          <LoginButton type="submit">Login</LoginButton>
          
        </FormDetails>
      </Container>
    </LoginUi>
  );
}

export default Login;
