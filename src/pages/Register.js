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

const ErrorMessage = styled.p`
  color: rgb(201, 69, 69);
  font-size: 16px;
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
  const [api , contexHolder] = notification.useNotification();

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
                <input name="password" type="password" ref={register} />
              </p>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </div>

            <div>
              <p>
                <label>Confirm Password</label>
              </p>
              <p>
                <input name="confirmPassword" type="password" ref={register} />
              </p>
              <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            </div>
            {userCreationError && <span>{userCreationError}</span>}
            <div>
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Button variant="secondary" onClick={() => history.push("/")}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </ContainerWrapper>
    </Context.Provider>
  );
}

export default Register;
