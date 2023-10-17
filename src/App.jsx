// import React from "react";

import { Dashboard, Jobs, Returns } from "./pages";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route element={<Jobs />} path="/jobs" />
      <Route element={<Returns />} path="/returns" />
    </Routes>
  );
};

export default App;
