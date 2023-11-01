// import React from "react";

import { Alert, Loading } from "./components";
import {
  Clients,
  CreateClient,
  CreateExpense,
  CreateJob,
  Dashboard,
  Expense,
  ForgotPassword,
  Jobs,
  Login,
  Register,
  Reports,
  Returns,
  Settings,
  SingleJob,
  SingleTransaction,
  Transactions,
} from "./pages";
import { PrivateRoute, PublicRoute } from "./routes";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Loading />
      <Alert />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<Login />} path="/login" />
          <Route element={<ForgotPassword />} path="/forgot" />
          <Route element={<Register />} path="/register" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Dashboard />} path="/dashboard" />
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
        </Route>
      </Routes>
    </>
  );
};

export default App;
