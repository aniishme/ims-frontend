import React from "react";
import { Link, Outlet } from "react-router-dom";

function Users() {
  return (
    <>
      <div className="users-links">
        <Link to="all">All Users</Link>
        <Link to="register">Create New</Link>
      </div>
      <Outlet />
    </>
  );
}

export default Users;
