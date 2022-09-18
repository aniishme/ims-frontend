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
import Item from "./pages/Item";
import EditItem from "./components/EditItem";
import Users from "./pages/Users";
import UsersList from "./pages/UsersList";

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
            <Route path="/products/:id" element={<Item />}>
              <Route path="edit" element={<EditItem />} />
            </Route>
            <Route path="/categories" element={<Category />} />
            <Route path="/categories/:id" element={<CategoryView />} />
            <Route path="/users" element={<Users />}>
              <Route path="register" element={<Register />} />
              <Route path="all" element={<UsersList />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
