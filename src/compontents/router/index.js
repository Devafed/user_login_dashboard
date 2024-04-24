import React from "react";
import Dashboard from "../index.js";
import Login from "../login/index.js";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
