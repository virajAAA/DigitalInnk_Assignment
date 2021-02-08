import React from "react";
import loginContent from "../login/index";
import "../css/Login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numberRegex = /(?=.*[0-9])/;

const schema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email("Must be the valid email")
    .required("required"),

  password: yup
    .string()
    .matches(lowerCaseRegex, "one lowercase required")
    .matches(upperCaseRegex, "one uppercase required")
    .matches(numberRegex, "one number is required")
    .min(8, "Minimum 8 characters required")
    .required("required"),
});

function Login() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginContent.loginInputs.map((input, key) => {
          return (
            <div key={key}>
              <p>
                <label>{input.label}</label>
              </p>
              <p>
                <input
                  className="input"
                  name={input.name}
                  type={input.type}
                  ref={register}
                />
              </p>
              <p className="messages">{errors[input.name]?.message}</p>
            </div>
          );
        })}
        <button className="loginbtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
