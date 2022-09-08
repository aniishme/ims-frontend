import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import Login from "../pages/Login";

function ProtectedRoute() {
  const { auth } = useContext(AuthContext) as AuthContextType;

  return auth ? <Outlet /> : <Login />;
}

export default ProtectedRoute;
