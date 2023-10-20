import styled from "styled-components";
/* eslint-disable react/prop-types */
// import React from "react";
import { useNavigate } from "react-router-dom";

const Text = styled.div`
  display: flex;
  padding: 6px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  flex: 1;
`;

const Pending = styled(Text)`
  background: #f9f3df;
  color: #e1b000;
`;

const Resolved = styled(Text)`
  background: #dff2e8;
  color: #2ca764;
  width: 65px;
`;

const Button = styled.button`
  padding: 6px 11.5px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
`;

const View = styled(Button)`
  background: #f5f8fa;
  color: #424243;
`;

const Container = styled.div`
  width: 100%;
`;

const Details = ({ status, id }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/job/${id}`);
  };
  return (
    <Container className="flex ai-center justify-between w-100">
      {status === "pending" ? (
        <div>
          <Pending>Pending</Pending>
        </div>
      ) : (
        <div>
          <Resolved>Done</Resolved>
        </div>
      )}
      <div>
        <View onClick={onClick}>View</View>
      </div>
    </Container>
  );
};

export default Details;
