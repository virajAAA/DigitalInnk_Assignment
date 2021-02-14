import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Button } from "../components";
import { notification } from "antd";
import "antd/dist/antd.css";
import * as yup from "yup";
import firebase from "firebase";

const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0efef;
`;

const FormDetials = styled.form`
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 6px;
  font-size: 14px;
  padding: 2px 10px;
  border: 1px solid black;
  border-radius: 6px;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: rgb(201, 69, 69);
  font-size: 13px;
  font-weight: 600;
  margin-left: 25px;
`;

const LableDetails = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: black;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  border-radius: 6px;
  font-size: 14px;
  padding: 5px 10px;
`;

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numberRegex = /(?=.*[0-9])/;

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

const Context = React.createContext({ name: "Default" });

function Register() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const [userCreationError, setUserCreationError] = useState("");

  /* eslint-disable no-unused-vars */
  const [api, contexHolder] = notification.useNotification();
  /* eslint-enable no-unused-vars */

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        notification.success({
          description: `Thanks you for registering`,
          placement: "topRight",
        });
        history.push("/");
      })
      .catch((error) => {
        if (error.message) {
          setUserCreationError(error.message);
        } else {
          setUserCreationError("Something went wrong, please try again!");
        }
      });
  };

  return (
    <Context.Provider value={{ name: "Ant Design" }}>
      {contexHolder}
      <ContainerWrapper>
        <Card>
          <FormDetials onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>
                <LableDetails>Email</LableDetails>
              </p>
              <InputWrapper>
                <Input
                  className="input"
                  name="email"
                  type="email"
                  ref={register}
                />
              </InputWrapper>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>
            <div>
              <p>
                <LableDetails>Password</LableDetails>
              </p>
              <InputWrapper>
                <Input name="password" type="password" ref={register} />
              </InputWrapper>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </div>

            <div>
              <p>
                <LableDetails>Confirm Password</LableDetails>
              </p>
              <InputWrapper>
                <Input name="confirmPassword" type="password" ref={register} />
              </InputWrapper>
              <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            </div>
            {userCreationError && (
              <ErrorMessage>{userCreationError}</ErrorMessage>
            )}
            <ButtonWrapper>
              <Button variant="secondary" type="submit">
                Register
              </Button>
              <Button variant="danger" onClick={() => history.push("/")}>
                Cancel
              </Button>
            </ButtonWrapper>
          </FormDetials>
        </Card>
      </ContainerWrapper>
    </Context.Provider>
  );
}

export default Register;
