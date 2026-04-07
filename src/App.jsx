import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Articulos from "./pages/Articulos";
import Clientes from "./pages/Clientes";
import Ventas from "./pages/Ventas";
import Usuarios from "./pages/Usuarios";
import Reportes from "./pages/Reportes";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));
  
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("usuario"));
      setUsuario(user);
    } catch (error) {
    setUsuario(null);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={
            <Login 
                onLogin={(user) => {
                  setIsAuthenticated(true);
                  setUsuario(user);
                }} 
              />
            } 
        />

        {/* Rutas protegidas */}
        {isAuthenticated ? (
          <Route path="/" element={<MainLayout setIsAuthenticated={setIsAuthenticated} />}>
            <Route index element={<Dashboard />} />
            <Route path="articulos" element={<Articulos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="ventas" element={<Ventas />} />

            {/* Solo ADMIN */}
            {usuario?.rol === "ADMIN" && (
              <Route
                path="usuarios"
                element={
                  usuario?.rol === "ADMIN"
                    ? <Usuarios />
                    : <Navigate to="/" />
                }
              />
            )}

            <Route path="reportes" element={<Reportes />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
