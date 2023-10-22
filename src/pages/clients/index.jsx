import { Button, Container, Small } from "../../components";

import React from "react";
import Table from "./table";
import axios from "axios";
import { useClient } from "./hook/useClient";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const Clients = () => {
  const { setClients, clients } = useClient();

  const navigate = useNavigate();

  const getAllClients = async () => {
    return await axios.get(`${url}/clients`);
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
        <Small title={`Clients (${clients.length})`} />
        <Button title="Create" onClick={() => navigate("/client/create")} />
      </div>
      <Table />
    </Container>
  );
};

export default Clients;
