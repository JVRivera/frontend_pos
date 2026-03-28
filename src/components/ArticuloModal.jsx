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

export default function ArticuloModal({
  open,
  handleClose,
  form,
  setForm,
  handleSave,
  errorMessage,
  editando
}) {
  //estado para el manejo de los errores
  const [errors, setErrors] = useState({});

  const validar = () => {
    let nuevosErrores = {};

    if (!form.articulo.trim()) {
      nuevosErrores.articulo = "El artículo es obligatorio";
    }

    if (!form.precioventa) {
      nuevosErrores.precioventa = "El precio de venta es obligatorio";
    }

    if (!form.preciocosto) {
      nuevosErrores.preciocosto = "El precio costo es obligatorio";
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
        {editando ? "Editando Artículo" : "Nuevo Artículo"}
      </DialogTitle>

      {errorMessage && (
        <Alert severity="error" sx={{ mx: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <DialogContent>

        <TextField
          label="Artículo"
          fullWidth
          margin="normal"
          value={form.articulo}
          error={!!errors.articulo}
          helperText={errors.articulo}          
          onChange={(e) =>
            setForm({ ...form, articulo: e.target.value })
          }
        />

        <TextField
          label="Descripción"
          fullWidth
          margin="normal"
          value={form.descripcion}        
          onChange={(e) =>
            setForm({ ...form, descripcion: e.target.value })
          }
        />

        <TextField
          label="Existencia"
          type="number"
          fullWidth
          margin="normal"
          value={form.existencia}        
          onChange={(e) =>
            setForm({ ...form, existencia: e.target.value })
          }
        />

        <TextField
          label="Precio Venta"
          type="number"
          fullWidth
          margin="normal"
          value={form.precioventa}
          error={!!errors.precioventa}
          helperText={errors.precioventa}           
          onChange={(e) =>
            setForm({ ...form, precioventa: e.target.value })
          }
        />

        <TextField
          label="Precio Costo"
          type="number"
          fullWidth
          margin="normal"
          value={form.preciocosto}
          error={!!errors.preciocosto}
          helperText={errors.preciocosto}           
          onChange={(e) =>
            setForm({ ...form, preciocosto: e.target.value })
          }
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={()=>{
            setErrors({});
            handleClose();
          }}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={() => {
              if (validar()) {
                handleSave();
                setErrors({})
              }
          }}
        >
          {editando ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>

    </Dialog>
  );
}