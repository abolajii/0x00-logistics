// import React from "react";

import {
  Clients,
  CreateClient,
  CreateExpense,
  CreateJob,
  Dashboard,
  Expense,
  Jobs,
  Reports,
  Returns,
  Settings,
  SingleJob,
  SingleTransaction,
  Transactions,
} from "./pages";
import { Route, Routes } from "react-router-dom";

import { Loading } from "./components";

const App = () => {
  return (
    <>
      <Loading />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Jobs />} path="/jobs" />
        <Route element={<SingleJob />} path="/job/:id" />
        <Route element={<CreateJob />} path="/job/create" />
        <Route element={<Returns />} path="/returns" />
        <Route element={<Transactions />} path="/transactions" />
        <Route element={<SingleTransaction />} path="/transaction/:id" />
        <Route path="/reports" element={<Reports />} />
        <Route path="/clients" element={<Clients />} />
        <Route element={<CreateClient />} path="/client/create" />
        <Route path="/expense" element={<Expense />} />
        <Route path="/expense/create" element={<CreateExpense />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
