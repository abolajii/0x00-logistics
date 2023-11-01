// import React from "react";

import { Inner, Logo, SidebarMenu, SidebarMenuTwo } from "./styles";

import { LMAuth } from "../../service/api.service";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { removeTokens } from "../../helper";
import { useLogin } from "../../pages/login/hook/useLogin";

const Sidebar = () => {
  const { setLoggedInUser } = useLogin();
  //
  const routes = [
    {
      path: "/",
      name: "Dashboard",
    },
    {
      path: "/jobs",
      name: "Jobs",
    },
    {
      path: "/expense",
      name: "Expense",
    },
    {
      path: "/clients",
      name: "Clients",
    },
    {
      path: "/transactions",
      name: "Transactions",
    },
    // {
    //   path: "/reports",
    //   name: "Reports",
    // },

    {
      path: "/settings",
      name: "Settings",
    },
  ];

  const logout = async () => {
    const refreshToken = await localStorage.getItem("refreshToken");
    try {
      await LMAuth.post("/logout", { refreshToken });
      removeTokens();
      setLoggedInUser({
        username: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Inner>
      <Logo className="center">
        <div className="image-container">
          <img src={logo} alt="logo" />
        </div>
      </Logo>
      <SidebarMenu>
        <p>Menu</p>
        <ul>
          {routes.slice(0, 5).map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </SidebarMenu>
      <SidebarMenuTwo>
        <p>Profile</p>
        <ul>
          {routes.slice(5).map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </SidebarMenuTwo>
    </Inner>
  );
};

export default Sidebar;
