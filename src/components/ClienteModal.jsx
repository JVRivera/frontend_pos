import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";

export default function ClientesModal({
  open,
  handleClose,
  form,
  setForm,
  handleSave,
  errorMessage,
  editando
}) {

  // estado para manejo de errores del lado del frontend
  const [errors, setErrors] = useState({});

  const validar = () => {
    let nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!form.direccion.trim()) {
      nuevosErrores.direccion = "La direccion es obligatoria";
    }   

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El telefono es obligatorio";
    }else if (form.telefono.trim().length < 8) {
      // Si tiene menos de 8 caracteres
      nuevosErrores.telefono = "El teléfono debe tener al menos 8 caracteres";
    }     
    
    if (!form.nit.trim()) {
      nuevosErrores.nit = "el NIT es obligatorio";
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
      disableAutoFocus
    >

      <DialogTitle>
        {editando ? "Editando Cliente" : "Nuevo Cliente"}
      </DialogTitle>

      {errorMessage && (
        <Alert severity="error" sx={{ mx: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <DialogContent>

        <TextField
          label="Nombre"
          fullWidth
          margin="normal"
          value={form.nombre}
          error={!!errors.nombre}
          helperText={errors.nombre}
          onChange={(e) =>
            setForm({ ...form, nombre: e.target.value })
          }
        />

        <TextField
          label="Dirección"
          fullWidth
          margin="normal"
          value={form.direccion}
          error={!!errors.direccion}
          helperText={errors.direccion}          
          onChange={(e) =>
            setForm({ ...form, direccion: e.target.value })
          }
        />

        <TextField
          label="Teléfono"
          fullWidth
          margin="normal"
          value={form.telefono}
          error={!!errors.telefono}
          helperText={errors.telefono}            
          onChange={(e) =>
            setForm({ ...form, telefono: e.target.value })
          }
        />

        <TextField
          label="NIT"
          fullWidth
          margin="normal"
          value={form.nit}
          error={!!errors.nit}
          helperText={errors.nit}   
          onChange={(e) =>
            setForm({ ...form, nit: e.target.value })
          }
        />

      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            setErrors({});
            handleClose();
          }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            if (validar()) {
              handleSave();
              setErrors({});
            }
          }}
        >
          {editando ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>

    </Dialog>
  );
}