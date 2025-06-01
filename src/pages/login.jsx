import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Link, Paper } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/home");
    } catch (err) {
      alert("Error al iniciar sesión: ", err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "90%",
          maxWidth: "400px",
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 3,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Contraseña"
            variant="outlined"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
              py: 1.5,
              mb: 2,
              fontSize: "1rem",
            }}
          >
            Ingresar
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          ¿No tienes cuenta?{" "}
          <Link href="/register" sx={{ color: "#1976d2", fontWeight: "500" }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
