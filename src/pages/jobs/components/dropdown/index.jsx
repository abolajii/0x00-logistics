// import React from "react";

import styled from "styled-components";
import { useClient } from "../../../clients/hook/useClient";
import { useJobStore } from "../../hook/useJob";

const Container = styled.div`
  position: absolute;
  background: white;
  top: 85px;
  height: 190px;
  width: 100%;
  z-index: 999;
  border-radius: 5px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .margin {
    padding-top: 10px;
  }
`;

const Item = styled.div`
  padding: 10px;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background: #f0f0f0; /* Change the background color on hover */
  }
`;

const Dropdown = () => {
  const { setFormValue } = useJobStore();
  const { clients } = useClient();

  const handleClick = (val) => {
    setFormValue("customerName", val);
  };

  return (
    <Container>
      <div className="margin">
        {clients.map((client) => {
          return (
            <Item key={client._id} onClick={() => handleClick(client.name)}>
              {client.name}
            </Item>
          );
        })}
      </div>
    </Container>
  );
};

export default Dropdown;
