import React from "react";
import { useHistory } from "react-router-dom";
import content from "../register/index";
import "../css/Register.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const emailAddresses = [
  "sample@gmail.com",
  "test12@gmail.com",
  "viraj34@yahoo.com",
];

const lowerCaseRegex = /(?=.*[a-z])/;
const upperCaseRegex = /(?=.*[A-Z])/;
const numberRegex = /(?=.*[0-9])/;

const schema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email("Must be the valid email")
    .notOneOf(emailAddresses, "Email alredy taken!!!")
    .required("required *"),

  password: yup
    .string()
    .required("required *")
    .matches(lowerCaseRegex, "one lowercase required")
    .matches(upperCaseRegex, "one uppercase required")
    .matches(numberRegex, "one number is required")
    .min(8, "Minimum 8 characters required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password Must be the same")
    .required("required *"),
});

function Register() {
  let history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
  const emailid = data.email; 
  const passwrd =  data.password;

  firebase.auth().createUserWithEmailAndPassword(emailid, passwrd)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(".......", user);
    // ...
  })
  .catch((error) => {

    
    var errorMessage = error.message;
    console.log(">>>>>>>>>>>>" , errorMessage);
    // ..
  });
  };

  // const onSubmit = (data) => console.log(">>>>>>>",data.email);

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input, key) => {
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
        <button className="registerbtn" type="submit">
          Register
        </button>

        <button
          className="cancel"
          type="submit"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Register;
