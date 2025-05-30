import { useEffect, useState, useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://gutendex.com/books?${Date.now()}`);

      if (!response.ok) throw new Error("Error al cargar los libros");

      const data = await response.json();
      const selectedBooks = data.results
        .filter((book) => book.formats["image/jpeg"])
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      setBooks(selectedBooks);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            ¿Qué leerás hoy?
          </Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            Cerrar sesión
          </Button>
        </Box>

        {/* Contenido principal */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : (
            <>
              <Grid
                container
                spacing={4}
                sx={{
                  flex: 1,
                  alignContent: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  mb: 4,
                }}
              >
                {books.map((book) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={book.id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "450px",
                    }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        maxWidth: "350px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: "250px",
                          objectFit: "contain",
                          bgcolor: "#f5f5f5",
                          p: 2,
                        }}
                        image={book.formats["image/jpeg"]}
                        alt={book.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minHeight: "64px",
                          }}
                        >
                          {book.title}
                        </Typography>
                        <Typography color="text.secondary">
                          <strong>Autor:</strong>{" "}
                          {book.authors[0]?.name || "Desconocido"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: "auto",
                  pt: 4,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={fetchBooks}
                  sx={{
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0" },
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  Recargar libros
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
