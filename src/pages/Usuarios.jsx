import { useEffect, useState } from "react";
import {
  Box, Typography, Button,
  Table, TableBody, TableCell,
  TableContainer, TableHead,
  TableRow, Paper
} from "@mui/material";

import { getUsuarios, createUsuario, deleteUsuario, updateUsuario } from "../services/usuariosService";
import UsuarioModal from "../components/UsuarioModal";

export default function Usuarios() {
  //estado para abrir el modal
  const [open, setOpen] = useState(false);  
  //estado para obtener los usuarios  
  const [data, setData] = useState([]);

  //estado para los campos del formulario
  const [form, setForm] = useState({
      nombre: "",
      email: "",
      rol: "USER",
      password: ""
  });

  //estado para edicion
  const [editingId, setEditingId] = useState(null);  
    //estado para mostrar mensaje de error del server
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  //limpiarcampos 
  const limpiarCampos = () =>{
    setEditingId(null);
    setErrorMessage("");
    setForm({
      nombre: "",
      email: "",
      rol: "USER",
      password: "",
    });
  }  

  //obtener todos los usuarios
  const cargarUsuarios = async () => {
      try {
        const usuarios = await getUsuarios();
        setData(usuarios);
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      }
  };

  //agregar usuario
  const agregarUsuario = async () => {
      //obtenemos la info del formulario
      const data = {
        ...form
      };

      setErrorMessage(""); // limpiar errores previos
      try {              
          // CREAR          
          const response = await createUsuario(data);           
      } catch (err) {
          console.log(err.response.data.errores);
          setErrorMessage(err.response.data.errores);                  
          return
      }
      // refresca tabla
      cargarUsuarios(); 
      //cerrar modal
      setOpen(false);
      //colocar campos vacios
      limpiarCampos();
  };

  //actualizar usuario
  const actualizarUsuario = async (id) => {
      //obtenemos la info del formulario
      const data = {
        ...form
      };

      setErrorMessage(""); // limpiar errores previos
      try {
          // EDITAR
          const response = await updateUsuario(id, data);             
      } catch (err) {
          setErrorMessage(err.response.data.errores.join("\n"));                
          return          
      }
      // refresca tabla
      cargarUsuarios(); 
      //cerrar modal
      setOpen(false);
      //colocar campos vacios
      limpiarCampos();
  };  

  //eliminar usuario
  const eliminarUsuario = async (id) =>{
    const confirmar = window.confirm("¿Desea eliminar este usuario?");

    if (!confirmar) return;

    try {
       await deleteUsuario(id);
       cargarUsuarios();
    } catch (error) {
      setErrorMessage(err.response.data.errores);                  
      return      
    }    
  }

  //funcion para abrir modal modo edicion
  const abrirModarParaEdicion = (usuario) => {
      setForm({
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        password: usuario.password,
      });

      setEditingId(usuario.id);
      setOpen(true);
  };

  //funcion para crear y editar articulo    
  const handleSave = async () => {  
    if(editingId){
      actualizarUsuario(editingId);
    }else{
      agregarUsuario();
    }    
  } 

  return (
    <Box p={3} >
      
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Usuarios</Typography>
        <Button variant="contained"
            onClick={() => {
                      setOpen(true);
                      limpiarCampos();
                    }}         
        >
            Nuevo Usuario
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
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rol</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", width: 200 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.rol}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="success"
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => abrirModarParaEdicion(row)}
                    disableEnforceFocus
                  >
                    Editar
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => eliminarUsuario(row.id)}
                  >
                    Eliminar
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>    

      <UsuarioModal
        open={open}
        form={form}
        setForm={setForm}
        handleClose={() => setOpen(false)}
        handleSave={handleSave}
        editingId={editingId}
        errorMessage={errorMessage}
      />

    </Box>
  );
}