import React from "react";
import styled from "styled-components";
import { Button, Card } from "../components";
import { useHistory } from "react-router-dom";

const ContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0efef;
`;

function Home() {
  let history = useHistory();

  return (
    <ContainerWrapper>
      <Card>
        <Button
          size="large"
          variant="primary"
          onClick={() => history.push("/Login")}
        >
          Login
        </Button>
        <Button
          size="large"
          variant="secondary"
          onClick={() => history.push("/Register")}
        >
          Register
        </Button>
      </Card>
    </ContainerWrapper>
  );
}

export default Home;
