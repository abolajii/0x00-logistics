import { Button, Container, NavHeader, Small } from "../../components";

import { LMAuth } from "../../service/api.service";
import React from "react";
import Table from "./table";
import { useClient } from "./hook/useClient";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const { setClients, clients } = useClient();

  const navigate = useNavigate();

  const getAllClients = async () => {
    return await LMAuth.get(`/clients`);
  };

  React.useEffect(() => {
    const allClients = async () => {
      try {
        const response = await getAllClients();
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allClients();
  }, [setClients]);
  return (
    <Container title="Clients">
      <div className="flex ai-center justify-between">
        <div>
          <Small title={`Clients (${clients.length})`} />
          <NavHeader titleOne="Clients" path="/clients" />
        </div>
        <Button title="Create" onClick={() => navigate("/client/create")} />
      </div>
      <Table />
    </Container>
  );
};

export default Clients;
