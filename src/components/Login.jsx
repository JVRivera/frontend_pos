import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService.js"; // ruta según tu proyecto

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    if (!email || !password) {
      return;
    }

    try {
      const data = await login(email, password);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("usuario", JSON.stringify(data.usuario));

      onLogin(data.usuario);

      navigate("/");
    } catch (err) {
      setError("Email o contraseña incorrectos");
    }
  };  

  return (
    <Box sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5"
      }}
      component="form"
      autoComplete="off"
    >
      
      <Paper elevation={3} sx={{ p: 4, width: 300 }}>
        {error && <p style={{ color: "red" , textAlign: "center"}}>{error}</p>}
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>

        <TextField
          label="Correo"
          name="email_login"
          autoComplete="new-email"
          fullWidth
          margin="normal"
          value={email}
          error={!email && submitted}
          helperText={!email ? "Correo obligatorio" : ""}          
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        <TextField
          label="Contraseña"
          type="password"
          name="password_login"
          autoComplete="new-password"
          fullWidth
          margin="normal"
          value={password}
          error={!password && submitted}
          helperText={!password ? "Contraseña obligatoria" : ""}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
      </Paper>
    </Box>
  );
}