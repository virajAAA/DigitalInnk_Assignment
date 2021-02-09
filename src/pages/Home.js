import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DivLayout = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0efef;
`;

const ButtonOuter = styled.div`
  height: 40vh;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: white;
  border: 2px solid white;
  
  border-radius: 10px;
`;

const LoginButton = styled.button`
  margin: 5px;
  height: 18%;
  width: 30%;
  border: 2px solid #4997FB;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  background-color:#4997FB;
  color:#fff;
`;

const RgisterButton = styled.button`
  margin: 5px;
  height: 18%;
  width: 30%;
  border: 2px solid #5BCE43;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  background-color:#5BCE43;
  color:#fff;
`;




function Home() {
  let history = useHistory();

  return (

      <DivLayout>
        <ButtonOuter>
          <LoginButton type="button" onClick={() => history.push("/Login")}>
            Login
          </LoginButton>
          <RgisterButton type="button" onClick={() => history.push("/Register")}>
            Register
          </RgisterButton>
        </ButtonOuter>
      </DivLayout>
    
  );
}

export default Home;
