import React from "react";
import Events from "../dashboard/events/index.js";
import Main from "../dashboard/main/index.js";
import Header from "../dashboard/header/index.js";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Header />
      <div className="main-header">
        <Main />
        <Events />
      </div>
    </main>
  );
}
