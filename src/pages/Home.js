import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DivLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
  // background: linear-gradient(#3db1ff, #cad6d2, #3df9c2);
  background: linear-gradient(#e66465, #9198e5);
`;


const ButtonOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  justify-content: center;
`;

const ButtonLayout = styled.button`
  padding: 10px;
  margin: 10px;
  width: 13%;
  border: 2px solid black;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
`;

function Home() {
  let history = useHistory();

  return (
    <div className="Home">
      <DivLayout>
        <ButtonOuter>
          <ButtonLayout type="button" onClick={() => history.push("/Login")}>
            Login
          </ButtonLayout>
          <ButtonLayout type="button" onClick={() => history.push("/Register")}>
            Register
          </ButtonLayout>
        </ButtonOuter>
      </DivLayout>
    </div>
  );
}

export default Home;
