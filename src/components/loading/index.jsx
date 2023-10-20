// import React from "react";
import Spin from "./spin";
import styled from "styled-components";
import useModalStore from "./hook/useModalStore";

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(98, 97, 99, 0.4);
  z-index: 2;
  backdrop-filter: blur(2.5px);
`;

const Loading = () => {
  const { isOpen } = useModalStore();
  return (
    isOpen && (
      <Container className="center">
        <Spin />
      </Container>
    )
  );
};

export default Loading;
