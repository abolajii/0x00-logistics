import { Button, Container, Small } from "../../components";

import React from "react";
import Table from "./table";
import axios from "axios";
import { useJobStore } from "./hook/useJob";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:6600";

const Jobs = () => {
  const navigate = useNavigate();

  const getAllJobs = async () => {
    return await axios.get(`${url}/jobs`);
  };

  const { setJobs, jobs } = useJobStore();

  React.useEffect(() => {
    const allJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    allJobs();
  }, [setJobs]);

  const length = jobs.filter((job) => job.jobStatus === "pending").length;

  return (
    <Container title="Jobs">
      <div className="flex ai-center justify-between">
        <Small title={`Jobs (${length})`} />
        <Button title="Create" onClick={() => navigate("/job/create")} />
      </div>
      <Table />
    </Container>
  );
};

export default Jobs;
