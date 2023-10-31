// import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  inset: 0;
  height: 100px;
`;

const Inner = styled.div`
  background: cyan;
  width: 300px;
  margin: 0 auto;
`;

const Todo = () => {
  return (
    <Container>
      <Inner>Remeber to fix password</Inner>
    </Container>
  );
};

export default Todo;
