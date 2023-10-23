import { Container, Small } from "../../components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Grid, GridContainer, Inner } from "./styles";

import React from "react";
import axios from "axios";
import { formatBalance } from "../../helper";

const Dashboard = () => {
  const [showBalance, setShowBalance] = React.useState(false);
  const [profit, setProfit] = React.useState(0);

  const url = "http://localhost:6600";

  const getDashboard = async () => {
    return await axios.get(`${url}/dashboard`);
  };

  React.useEffect(() => {
    const dashboardDetails = async () => {
      try {
        const response = await getDashboard();
        setProfit(response.data.netProfit);
      } catch (error) {
        console.log(error);
      }
    };

    dashboardDetails();
  }, []);

  // Function to toggle the visibility of the balance
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  return (
    <Container title="Dashboard">
      <Inner>
        <Small title="Balance" />
        <GridContainer>
          <Grid>
            <div className="top">
              <div className="flex ai-center">
                <p className="">A-Quads Errands balance</p>
                <div
                  className="center cursor icon"
                  onClick={toggleBalanceVisibility}
                >
                  {!showBalance ? (
                    <FiEyeOff size={14} color="#000" />
                  ) : (
                    <FiEye size={14} color="#000" />
                  )}
                </div>
              </div>
              {showBalance ? (
                <div className="flex ai-center">
                  <p className="bal">{formatBalance(profit)}</p>
                </div>
              ) : (
                <div className="flex ai-center">
                  <div className="bal">₦*** · **</div>
                </div>
              )}
            </div>
            <p className="date">19 Oct, 2023.</p>
          </Grid>
        </GridContainer>
      </Inner>
    </Container>
  );
};

export default Dashboard;
