import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Navbar() {
  const { user } = useAuth();
  const { isSuccess, refetch } = useQuery(["logout"], logout, {
    enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
    },
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogout = () => {
    refetch();
  };
  return (
    <>
      <div className="navbar">
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/users">Users</Link>
        </div>
        <div className="nav-user">
          <p>
            {user?.username} | {user?.role?.toLowerCase()}
          </p>

          <Button variant="outline" color="red" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
