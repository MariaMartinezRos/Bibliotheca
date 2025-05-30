import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Link,
} from "@mui/material";
import bibliothecaLogo from "/bibliotheca.svg";

function App() {5
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? (
    <Navigate to="/home" />
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      // p={3}
      textAlign="center"
      sx={{
        backgroundColor: "#F5F5F5",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box mb={3}>
          <a
            href="https://github.com/MariaMartinezRos/Bibliotheca.git"
            target="_blank"
          >
            <img
              src={bibliothecaLogo}
              alt="Bibliotheca logo"
              style={{ width: "120px", height: "auto" }}
            />
          </a>
        </Box>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Bibliotheca
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Tu biblioteca digital personal
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href="/login"
          fullWidth
          size="large"
          sx={{ mb: 2 }}
        >
          Iniciar sesión
        </Button>

        <Typography variant="body2">
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default App;
