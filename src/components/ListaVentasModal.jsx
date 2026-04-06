import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";

const ModalVentas = ({ open, handleClose, ventas, imprimirVenta, eliminarVenta }) => {
  return (
    <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        fullWidth
        maxWidth="md"
      >
      <DialogTitle>
        <Typography variant="h6">
          Ventas
        </Typography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>

        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cliente</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Opciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ventas?.map((venta) => (
                <TableRow key={venta.id}>
                  <TableCell>{venta.id}</TableCell>
                  <TableCell>{venta.fecha}</TableCell>
                  <TableCell>{venta.clientes.nombre}</TableCell>
                  <TableCell>{venta.total}</TableCell>

                  <TableCell>

                    <Button
                      size="small"
                      startIcon={<PrintIcon />}
                      onClick={() => imprimirVenta(venta)}
                    >
                      
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => eliminarVenta(venta)}
                    >
                      
                    </Button>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

      </DialogContent>
    </Dialog>
  );
};

export default ModalVentas;