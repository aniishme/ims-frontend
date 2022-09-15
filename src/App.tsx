import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Loader } from "@mantine/core";
import Category from "./pages/Category";
import { useAuth } from "./context/AuthContext";
import CategoryView from "./pages/CategoryView";
import Register from "./pages/Register";
import Items from "./pages/Items";
import Navbar from "./components/Navbar";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Items />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/categories/:id" element={<CategoryView />} />
            <Route path="/users" element={<Register />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
