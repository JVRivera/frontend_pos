import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";

export default function ModalUsuarios({ open, form, setForm, handleClose, handleSave, editingId, errorMessage }) {

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSave = () => {
    handleSave(form);
  };

  // estado para manejo de errores del lado del frontend
  const [errors, setErrors] = useState({});

  const validar = () => {
    let nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    }   

    if (!form.rol.trim()) {
      nuevosErrores.rol = "El rol es obligatorio";
    }     
    
    if (!form.password.trim()) {
      nuevosErrores.password = "el password es obligatorio";
    }      

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };  

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose();
        }
      }}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        {editingId ? "Editar Usuario" : "Nuevo Usuario"}
      </DialogTitle>

      {errorMessage && (
        <Alert severity="error" sx={{ mx: 3 }}>
          {errorMessage}
        </Alert>
      )}


      <DialogContent>

        <Stack spacing={2} mt={1}>

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={form.nombre}
            error={!!errors.nombre}
            helperText={errors.nombre}            
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            error={!!errors.email}
            helperText={errors.email}            
            onChange={handleChange}
          />

          <TextField
            select
            fullWidth
            label="Rol"
            name="rol"
            value={form.rol}
            error={!!errors.rol}
            helperText={errors.rol}             
            onChange={handleChange}
          >
            <MenuItem value="ADMIN">Administrador</MenuItem>
            <MenuItem value="USER">Usuario</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            error={!!errors.password}
            helperText={errors.password}             
            onChange={handleChange}
          />

        </Stack>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            if (validar()) {
              onSave();
              setErrors({});
            }
          }}          
        >
          {editingId ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>

    </Dialog>
  );
}