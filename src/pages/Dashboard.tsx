import React from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="stats">
          <h1>Total Products: 10</h1>
        </div>
        <div className="stats">
          <h1>Total Categories: 10</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
