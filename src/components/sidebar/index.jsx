// import React from "react";

import { Inner, Logo, SidebarMenu, SidebarMenuTwo } from "./styles";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
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
      path: "/transactions",
      name: "Transactions",
    },
    {
      path: "/expense",
      name: "Expense",
    },
    {
      path: "/reports",
      name: "Reports",
    },
    {
      path: "/clients",
      name: "Clients",
    },

    {
      path: "/settings",
      name: "Settings",
    },
  ];

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
          {routes.slice(0, 6).map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </SidebarMenu>
      <SidebarMenuTwo>
        <p>Profile</p>
        <ul>
          {routes.slice(6).map((route, index) => (
            <li key={index}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
          <li>
            <Link>Logout</Link>
          </li>
        </ul>
      </SidebarMenuTwo>
    </Inner>
  );
};

export default Sidebar;
