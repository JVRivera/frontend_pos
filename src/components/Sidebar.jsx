import { useState, useEffect  } from "react";
import {
  Box, Drawer, List, ListItem,
  ListItemButton, ListItemIcon,
  ListItemText, Typography, Button,
  IconButton, AppBar, Toolbar,
  useMediaQuery
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

export default function Sidebar() {
  
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("usuario"));
      setUsuario(user);
    } catch (error) {
    setUsuario(null);
    }
  }, []);

  const menuItems = [
    { text: "Articulos", icon: <InventoryIcon sx={{ color: "white" }}/>, path: "/articulos" },
    { text: "Clientes", icon: <PeopleIcon sx={{ color: "white" }}/>, path: "/clientes" },
    { text: "Ventas", icon: <PointOfSaleIcon sx={{ color: "white" }}/>, path: "/ventas" },

    ...(usuario?.rol === "ADMIN"
        ? [{ text: "Usuarios", icon: <PersonIcon sx={{ color: "white" }}/>, path: "/usuarios" }]
    : []),

    { text: "Reportes", icon: <BarChartIcon sx={{ color: "white" }} />, path: "/reportes" }
  ];

  const onLogout = () => {
    sessionStorage.clear();
    
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#1976D2",
        color: "white"
      }}
    >
      <Box >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            Mi Empresa
          </Typography>

          <Typography variant="caption" display="block">
            USUARIO: {usuario?.nombre}
          </Typography>          
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  color: "white",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#091a2c",
                  }
                }}              
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          fullWidth
          onClick={onLogout}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Barra superior solo en móvil */}
      {isMobile && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">
              Sistema POS
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            height: "100vh",
            display: "flex",
            flexDirection: "column"
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}