import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";

function ProtectedRoute() {
  const { auth } = useContext(AuthContext) as AuthContextType;

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
