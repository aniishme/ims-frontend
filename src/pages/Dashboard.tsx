import React from "react";
import Navbar from "../components/Navbar";
import { useCategory } from "../hooks/useCategory";
import { useItem } from "../hooks/useItem";

function Dashboard() {
  const items = useItem();
  const category = useCategory();
  return (
    <>
      <div className="dashboard">
        <div className="stats">
          <h1>Total Products: {items?.data?.data?.length}</h1>
        </div>
        <div className="stats">
          <h1>Total Categories: {category?.data?.data?.length}</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
