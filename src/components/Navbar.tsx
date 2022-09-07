import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext) as AuthContextType;
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/users">Users</Link>
      </div>
      <div className="nav-user">
        <p>
          {user.username} | {user.role.toLowerCase()}
        </p>
      </div>
    </div>
  );
}

export default Navbar;
