import { Button, Container, NavHeader, Small } from "../../components";

import { LMAuth } from "../../service/api.service";
import React from "react";
import Table from "./table";
import { useJobStore } from "./hook/useJob";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();

  const getAllJobs = async () => {
    return await LMAuth.get(`/jobs`);
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
        <div>
          <Small title={`Jobs (${length})`} />
          <NavHeader titleOne="Jobs" path="/jobs" />
        </div>
        <Button title="Create" onClick={() => navigate("/job/create")} />
      </div>
      <Table />
    </Container>
  );
};

export default Jobs;
