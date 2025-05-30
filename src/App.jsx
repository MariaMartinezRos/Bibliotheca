import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";

import bibliothecaLogo from "/bibliotheca.svg";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return user ? (
    <Navigate to="/home" />
  ) : (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <a
        href="https://github.com/MariaMartinezRos/Bibliotheca.git"
        target="_blank"
      >
        <img src={bibliothecaLogo} className="logo" alt="Bibliotheca logo" />
      </a>
      <h2>Bibliotheca</h2>
      <p>
        Por favor, <a href="/login">inicia sesión</a> para continuar.
      </p>
    </div>
  );
}

export default App;