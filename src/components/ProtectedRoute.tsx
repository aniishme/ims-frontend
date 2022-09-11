import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { isSuccess } = useAuth();
  console.log(isSuccess);

  return isSuccess ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
