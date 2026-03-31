import { useEffect, useState } from "react";
import {
  Box, Typography, Button,
  Table, TableBody, TableCell,
  TableContainer, TableHead,
  TableRow, Paper, TablePagination,
  TextField
} from "@mui/material";

import { getClientes, createCliente, deleteCliente, updateCliente, buscarCliente } from "../services/clientesService";
import ClienteModal from "../components/ClienteModal";

export default function Clientes() {
  //estado para abrir el modal
  const [open, setOpen] = useState(false);

  //estado para los campos del formulario
  const [form, setForm] = useState({
      nombre: "",
      direccion: "",
      telefono: "",
      nit: ""
  });

  //estado para obtener los clientes  
  const [data, setData] = useState([]);
  //estado para buscar clientes
  const [search, setSearch] = useState("");
  
  //estado para edicion
  const [editingId, setEditingId] = useState(null);
  //estado para mostrar mensaje de error del server
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length > 1) {
        handleBuscar();
      }
    }, 400);

    return () => clearTimeout(delay);

  }, [search]);

  //funcion para buscar los clientes por nombre
  const handleBuscar = async () => {
    try {
      const clientes = await buscarCliente(search);
      setData(clientes);
    } catch (error) {
      console.error("Error buscando clientes", error);
    }
  };  

  //funcion para abrir modal modo edicion
  const handleEdit = (cliente) => {
      setForm({
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        nit: cliente.nit,
      });

      setEditingId(cliente.id);
      setOpen(true);
  };  

  //funcion para eliminar articulos
  const handleDelete = async (id) => {
      const confirmar = window.confirm("¿Desea eliminar este cliente?");

      if (!confirmar) return;

      try {
        await deleteCliente(id);
        cargarClientes();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
  }; 

  //obtener todos los clientes
  const cargarClientes = async () => {
      try {
        const clientes = await getClientes();
        setData(clientes);
      } catch (error) {
        console.error("Error al cargar clientes", error);
      }
  };

  //limpiarcampos 
  const limpiarCampos = () =>{
    setEditingId(null);
    //setErrorMessage("");
    setForm({
      nombre: "",
      direccion: "",
      telefono: "",
      nit: "",
    });
  }

  //funcion para crear y editar articulo    
  const handleSave = async () => {      
    try {
      const data = {
        ...form
      };

      if (editingId) {
        setErrorMessage(""); // limpiar errores previos
        try {
            // EDITAR
            const response = await updateCliente(editingId, data);             
        } catch (err) {
            setErrorMessage(err.response.data.errores.join("\n"));                
            return          
        }
  
      } else {
        setErrorMessage(""); // limpiar errores previos
        try {              
            // CREAR          
            const response = await createCliente(data);           
        } catch (err) {
            setErrorMessage(err.response.data.errores);                  
            return
        }

      }

      cargarClientes(); // refresca tabla

      setOpen(false);
      limpiarCampos();

    } catch (error) {
      console.error("Error al guardar", error);
    }
  };    

  return (
    <Box p={3} >
      
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Clientes</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button 
            variant="contained"
            onClick={() => {
              cargarClientes()
            }}
          >
            Ver Todos
          </Button>

          <Button 
            variant="contained"
            onClick={() => {
              setOpen(true)
              limpiarCampos()
            }}
          >
            Nuevo Cliente
          </Button>          
        </Box>
      </Box>

      <Box sx={{ mb: 2, background: "white" }}>
        <TextField
          fullWidth
          size="small"
          label="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Dirección</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Teléfono</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>NIT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", width: 200 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.direccion}</TableCell>
                  <TableCell>{row.telefono}</TableCell>
                  <TableCell>{row.nit}</TableCell>
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

      <ClienteModal
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