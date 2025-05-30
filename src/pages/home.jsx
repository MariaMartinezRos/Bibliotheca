import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://gutendex.com/books");
      const data = await response.json();

      const shuffled = data.results.sort(() => 0.5 - Math.random());
      const selectedBooks = shuffled.slice(0, 3);

      setBooks(selectedBooks);
    } catch (error) {
      console.error("Error al mostrar los libros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>¿Que leerás hoy?</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              width: "250px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              background: "#f9f9f9",
            }}
          >
            <h3>{book.title}</h3>
            <p>
              <strong>Autor:</strong>{" "}
              {book.authors.length > 0 ? book.authors[0].name : "Desconocido"}
            </p>
            {book.formats["image/jpeg"] && (
              <img
                src={book.formats["image/jpeg"]}
                alt={book.title}
                style={{ width: "100%", borderRadius: "4px" }}
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={fetchBooks}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Recargar libros
      </button>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Home;
