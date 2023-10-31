import { Container, NavHeader, Small } from "../../components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Grid, GridContainer, Inner } from "./styles";

import { LMAuth } from "../../service/api.service";
import React from "react";
import { formatBalance } from "../../helper";
import { formatDate } from "../../helper";
import { useLogin } from "../login/hook/useLogin";

const Dashboard = () => {
  const [showBalance, setShowBalance] = React.useState(false);
  const [profit, setProfit] = React.useState(0);

  const { loggedInUser, setTotalAmount } = useLogin();

  const getDashboard = async () => {
    return await LMAuth.get(`/dashboard`);
  };

  const date = formatDate(new Date());

  React.useEffect(() => {
    const dashboardDetails = async () => {
      try {
        const response = await getDashboard();
        setProfit(response.data.netProfit);
        setTotalAmount(response.data.totalPaidJobsAmount);
      } catch (error) {
        console.log(error);
      }
    };

    dashboardDetails();
  }, [setTotalAmount]);

  // Function to toggle the visibility of the balance
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  return (
    <Container title="Dashboard">
      <Inner>
        <Small title="Balance" />
        <NavHeader titleOne="Home" />
        <GridContainer>
          <Grid>
            <div className="top">
              <div className="flex ai-center">
                <p className="">
                  {loggedInUser.businessName || "N / A"} balance
                </p>
                <div
                  className="center cursor icon"
                  onClick={toggleBalanceVisibility}
                >
                  {showBalance ? (
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
            <p className="date">{date}</p>
          </Grid>
        </GridContainer>
      </Inner>
    </Container>
  );
};

export default Dashboard;
