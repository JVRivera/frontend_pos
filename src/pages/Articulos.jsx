import { useEffect, useState } from "react";
import {
  Box, Typography, Button,
  Table, TableBody, TableCell,
  TableContainer, TableHead,
  TableRow, Paper, TablePagination
} from "@mui/material";

import { getArticulos, createArticulo, deleteArticulo, updateArticulo } from "../services/articulosService";
import ArticuloModal from "../components/ArticuloModal";

export default function Articulos() {
  //estado para mostrar mensaje de error del server
  const [errorMessage, setErrorMessage] = useState("");
  //estado para edicion
  const [editingId, setEditingId] = useState(null);
  //estado para el modal
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
      articulo: "",
      descripcion: "",
      existencia: "",
      precioventa: "",
      preciocosto: ""
  });

  //stados y funciones para la paginacion
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  

  //funcion para abrir modal modo edicion
  const handleEdit = (articulo) => {
    setForm({
      articulo: articulo.articulo,
      descripcion: articulo.descripcion,
      existencia: articulo.existencia,
      precioventa: articulo.precioventa,
      preciocosto: articulo.preciocosto
    });

    setEditingId(articulo.id);
    setOpen(true);
  };    

  //funcion para eliminar articulos
  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar este artículo?");

    if (!confirmar) return;

    try {
      await deleteArticulo(id);
      cargarArticulos();
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };    

  //limpiarcampos 
  const limpiarCampos = () =>{
    setEditingId(null);
    setErrorMessage("");
    setForm({
      articulo: "",
      descripcion: "",
      existencia: "",
      precioventa: "",
      preciocosto: ""
    });
  }

  //funcion para crear y editar articulo
  const handleSave = async () => {
    try {
      const data = {
        ...form,
        existencia: Number(form.existencia),
        precioventa: Number(form.precioventa),
        preciocosto: Number(form.preciocosto)
      };

      if (editingId) {
        setErrorMessage(""); // limpiar errores previos
        try {
            // EDITAR
            const response = await updateArticulo(editingId, data);             
        } catch (err) {
            setErrorMessage(err.response.data.errores.join("\n"));                
            return          
        }
  
      } else {
        setErrorMessage(""); // limpiar errores previos
        try {              
            // CREAR          
            const response = await createArticulo(data);           
        } catch (err) {
            setErrorMessage(err.response.data.errores.join("\n"));                  
            return
        }

      }

      cargarArticulos(); // refresca tabla

      setOpen(false);
      limpiarCampos();

    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  //estado para cargar los articulos  
  const [data, setData] = useState([]);

  useEffect(() => {
    cargarArticulos();
  }, []);

  const cargarArticulos = async () => {
    try {
      const articulos = await getArticulos();
      setData(articulos);
    } catch (error) {
      console.error("Error al cargar artículos", error);
    }
  };

  return (
    <Box p={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5">Artículos</Typography>
            <Button variant="contained"
                    onClick={() => {
                      setOpen(true)
                      limpiarCampos()}
                    }            
            >
            Nuevo Artículo
            </Button>
        </Box>

      <TableContainer component={Paper} sx={{ 
            width: "100%",
            boxShadow: 1,
            borderRadius: 2
        }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#000000" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Artículo</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Descripción</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Existencia</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Precio Venta</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Precio Costo</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", width: 200 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
              {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.articulo}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.existencia}</TableCell>
                <TableCell>{row.precioventa}</TableCell>
                <TableCell>{row.preciocosto}</TableCell>
                <TableCell>
                <Button
                    size="small"
                    color="success"
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(row)}
                  >
                    Editar
                </Button>
                  <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => handleDelete(row.id)}
                    >
                      Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

        <ArticuloModal
            open={open}
            handleClose={() => {
                                setOpen(false)
                                setErrorMessage("")
                              }
                        }
            form={form}
            setForm={setForm}
            handleSave={handleSave}
            errorMessage={errorMessage}
            editando={editingId}
        />

    </Box>            
  );

  
}