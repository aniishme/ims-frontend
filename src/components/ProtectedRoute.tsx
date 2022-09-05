import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

function ProtectedRoute() {
  const cookie = new Cookies();

  return cookie.get("auth") ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
