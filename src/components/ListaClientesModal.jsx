import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3
};

const ModalClientes = ({ open, handleClose, clientes, onSeleccionar }) => {
  return (
    <Modal open={open} onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}>

      <Box sx={style}>
        {/* Botón cerrar */}
        <IconButton
            onClick={handleClose}
            sx={{
            position: "absolute",
            top: 8,
            right: 8
            }}
        >
            <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          Seleccionar Cliente
        </Typography>

        <TableContainer component={Paper}>
          <Table>
             <TableHead sx={{ backgroundColor: "#000000" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Dirección</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>NIT</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.direccion}</TableCell>
                  <TableCell>{cliente.nit}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onSeleccionar(cliente)}
                    >
                      Seleccionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

      </Box>
    </Modal>
  );
};

export default ModalClientes;