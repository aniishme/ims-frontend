import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "./context/AuthContext";
import { Loader } from "@mantine/core";

function App() {
  const { isLoading } = useContext(AuthContext) as AuthContextType;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
