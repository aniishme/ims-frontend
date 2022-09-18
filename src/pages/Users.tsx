import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Users() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "ADMIN") {
      navigate("/");
    }
  });
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
