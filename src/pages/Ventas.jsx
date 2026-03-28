// Ventas.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Ventas = () => {
  // Estado de cliente seleccionado
  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    direccion: "",
    nit: "",
  });

  // Estado de artículos de la venta
  const [articulos, setArticulos] = useState([
    // Ejemplo inicial
    // { id: 1, articulo: "Arroz", descripcion: "Arroz 1kg", cantidad: 2, precioventa: 5, descuento: 0, total: 10 }
  ]);

  return (
    <Box p={3}>
      {/* Botones Cobrar y Cancelar */}
      <Box mb={3} display="flex" gap={2}>
        <Button variant="contained" color="success">
          Cobrar Venta
        </Button>
        <Button variant="contained" color="error">
          Cancelar Venta
        </Button>
      </Box>

      {/* Buscar cliente */}
      <Box mb={3}>
        <TextField
          label="Buscar Cliente"
          variant="outlined"
          fullWidth
          // Aquí se puede agregar onChange para buscar clientes
        />
      </Box>

      {/* Información del cliente */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="ID"
            variant="outlined"
            fullWidth
            value={cliente.id}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={cliente.nombre}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={cliente.direccion}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="NIT"
            variant="outlined"
            fullWidth
            value={cliente.nit}
            disabled
          />
        </Grid>
      </Grid>

      {/* Buscar articulos para la venta */}
      <Box mb={3}>
        <TextField
          label="Buscar Articulos"
          variant="outlined"
          fullWidth
          // Aquí se puede agregar onChange para buscar clientes
        />
      </Box>      

      {/* Tabla de artículos */}
      <TableContainer component={Paper} mb={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Artículo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Venta</TableCell>
              <TableCell>Descuento</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articulos.map((art) => (
              <TableRow key={art.id}>
                <TableCell>{art.id}</TableCell>
                <TableCell>{art.articulo}</TableCell>
                <TableCell>{art.descripcion}</TableCell>
                <TableCell>{art.cantidad}</TableCell>
                <TableCell>{art.precioventa}</TableCell>
                <TableCell>{art.descuento}</TableCell>
                <TableCell>{art.total}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Totales */}
      <Box display="flex" justifyContent="flex-end" gap={5} mt={2}>
        <Typography variant="h6">Subtotal: Q0</Typography>
        <Typography variant="h6">Descuento: Q0</Typography>
        <Typography variant="h5">Total: Q0</Typography>
      </Box>
    </Box>
  );
};

export default Ventas;