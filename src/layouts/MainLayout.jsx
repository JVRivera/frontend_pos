import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", 
        p:2,
        minHeight: "100vh",
        backgroundColor: "#cde4f5" }}>
      <Sidebar onLogout={handleLogout} />

      <Box component="main" sx={{ flexGrow: 1, p:3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}