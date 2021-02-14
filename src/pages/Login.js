import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { Button, Card } from "../components";
import * as yup from "yup";
import firebase from "firebase";
import styled from "styled-components";
import { connect } from "react-redux";

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
  font-size: 13px;
  font-weight: 600;
  margin-left: 25px;
`;

const FormDetials = styled.form`
  width: 100%;
`;

const FormGroup = styled.form`
  padding: 12px;
`;

const LableDetails = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: black;
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

const InputWrapper = styled.div`
  border-radius: 6px;
  font-size: 14px;
`;

const LoginTitle = styled.h1`
  text-align: center;
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email("Must be the valid email")
    .required("Required*"),
  password: yup.string().required("Required*"),
});

const Login = (props) => {
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
        props.setUserDetails(data.email);
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
        <FormDetials onSubmit={handleSubmit(onSubmit)}>
          <LoginTitle>Log in to Digitalinnk</LoginTitle>
          <FormGroup>
            <p>
              <LableDetails>Email</LableDetails>
            </p>
            <InputWrapper>
              <Input
                className="input"
                name="email"
                type="email"
                placeholder="Email Address"
                ref={register}
              />
            </InputWrapper>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <p>
              <LableDetails>Password</LableDetails>
            </p>
            <InputWrapper>
              <Input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                ref={register}
              />
            </InputWrapper>
            <ErrorMessage className="messages">
              {errors.password?.message}
            </ErrorMessage>
          </FormGroup>
          {authenticationError && (
            <ErrorMessage>{authenticationError}</ErrorMessage>
          )}
          <div>
            <Button type="submit" centerAlign>
              Login
            </Button>
          </div>
          <p>{errors.message}</p>
        </FormDetials>
      </Card>
    </ContainerWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetails: (email) => {
      dispatch({ type: "SET_USER_DETAILS", userDetails: { email } });
    },
  };
};
export default connect(null, mapDispatchToProps)(Login);
