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
  width: 900,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3
};

const ModalArticulos = ({ open, handleClose, articulos, onSeleccionar }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>

        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">
            Seleccionar Artículo
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabla */}
        <TableContainer component={Paper}>
          <Table>

            {/* Encabezado negro */}
            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Articulo</TableCell>
                <TableCell sx={{ color: "white" }}>Descripcion</TableCell>
                <TableCell sx={{ color: "white" }}>Existencia</TableCell>
                <TableCell sx={{ color: "white" }}>Precio Venta</TableCell>
                <TableCell sx={{ color: "white" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {articulos?.map((articulo) => (
                <TableRow key={articulo.id}>
                  <TableCell>{articulo.id}</TableCell>
                  <TableCell>{articulo.articulo}</TableCell>
                  <TableCell>{articulo.descripcion}</TableCell>
                  <TableCell>{articulo.existencia}</TableCell>
                  <TableCell>{articulo.precioventa}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onSeleccionar(articulo)}
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

export default ModalArticulos;