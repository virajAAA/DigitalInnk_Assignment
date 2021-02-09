import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import firebase from "firebase";

const RegisterUi = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0efef;
`;

const Input = styled.input`
  padding: 2px;
  width: 90%;
  font-size: 1rem;
  letter-spacing: 1px;
`;

const RegisterButton = styled.button`
  margin-left: 30%;
  transform: translateX(-50%);
  width: 120px;
  height: 34px;
  border: none;
  outline: none;
  background-color: #5bce43;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  color: white;
  border-radius: 4px;
`;

const CancelButton = styled.button`
  margin-left: 55%;
  transform: translateY(-100%);
  width: 120px;
  height: 34px;
  border: none;
  outline: none;
  background-color: rgb(201, 69, 69);
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  color: white;
  border-radius: 4px;
`;

const Container = styled.div`
  margin: auto;
  width: 400px;
  max-width: 90%;
`;

const ErrorMessage = styled.p`
  color: rgb(201, 69, 69);
  font-size: 16px;
`;

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numberRegex = /(?=.*[0-9])/;

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
const schema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email("Must be the valid email")
    .required("Required *"),

  password: yup
    .string()
    .required("Required *")
    .matches(lowerCaseRegex, "one lowercase required")
    .matches(upperCaseRegex, "one uppercase required")
    .matches(numberRegex, "one number is required")
    .min(8, "Minimum 8 characters required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password Must be the same")
    .required("Required *"),
});

function Register() {
  let history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Signed in
        history.push("/");
        // ...
      })
      .catch((error) => {
        console.log("error>>>>>>", error);
        // ..
      });
  };

  return (
    <RegisterUi>
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
                ref={register}
              />
            </p>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <p>
              <label>Confirm Password</label>
            </p>
            <p>
              <Input
                className="input"
                name="confirmPassword"
                type="password"
                ref={register}
              />
            </p>
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </FormGroup>
          <RegisterButton type="submit">Register</RegisterButton>
          <CancelButton
            className="cancel"
            type="submit"
            onClick={() => history.push("/")}
          >
            Cancel
          </CancelButton>
        </FormDetails>
      </Container>
    </RegisterUi>
  );
}

export default Register;
