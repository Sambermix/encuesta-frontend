import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const candidatos = [
  { id: 1, nombre: "Omar Zamparo", partido: " ", imagen: "/omar.jpg" },
  { id: 2, nombre: "Julio Reniero", partido: " ", imagen: "/julio.jpg" },
  { id: 3, nombre: "Perla Muñoz", partido: " ", imagen: "/perla.jpg" },
  { id: 4, nombre: "Aldo Minetti", partido: " ", imagen: "/aldo.jpeg" },
  { id: 5, nombre: "Guillermo Schrenck", partido: " ", imagen: "/guillermo.jpg" }
];

function App() {
  const [votos, setVotos] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/votos")
      .then((res) => setVotos(res.data))
      .catch((error) => console.error("Error al obtener votos:", error));
  }, []);

  const votar = (id) => {
    if (localStorage.getItem("yaVoto")) {
      alert("Ya votaste. Solo se permite un votar una vez.");
      return;
    }

    axios.post("http://localhost:3001/votar", { id })
      .then(() => {
        setVotos((prev) => ({
          ...prev,
          [id]: (prev[id] || 0) + 1,
        }));
        localStorage.setItem("yaVoto", "true");
        alert("¡Gracias por votar!");
      })
      .catch(() => {
        alert("Hubo un error al registrar tu voto.");
      });
  };

  return (
    <div style={{
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(to bottom, #cce7ff, #ffffff)",
      minHeight: "100vh"
    }}>
      <h1 style={{
        textAlign: "center",
        color: "#0077b6",
        marginBottom: "0.5rem",
        textShadow: "1px 1px 2px #00000033"
      }}>
        Encuesta Electoral 2025 - Gral. Manuel Belgrano (Formosa)
      </h1>
      <h2 style={{
        textAlign: "center",
        color: "#005f8d",
        marginBottom: "2rem"
      }}>
        ¡Votá a tu concejal!
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
        {candidatos.map((candidato) => (
          <div key={candidato.id} style={{
            border: "2px solid #0077b6",
            borderRadius: "1rem",
            padding: "1rem",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#ffffff"
          }}>
            <img
              src={candidato.imagen}
              alt={candidato.nombre}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "0.5rem",
                marginBottom: "0.5rem"
              }}
              onError={(e) => { e.target.src = "/placeholder.jpg"; }}
            />
            <h3 style={{ margin: "0.3rem 0", color: "#003566" }}>{candidato.nombre}</h3>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>{candidato.partido}</p>
            <p style={{ fontWeight: "bold", margin: "0.5rem 0", color: "#0077b6" }}>
              Votos: {votos[candidato.id] || 0}
            </p>
            <button
              onClick={() => votar(candidato.id)}
              style={{
                backgroundColor: "#00b4d8",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Votar
            </button>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#555' }}
  dangerouslySetInnerHTML={{
    __html: `
      <p>
        Esta encuesta electoral <strong>no es oficial</strong>. Es una encuesta ciudadana sin valor legal,
        creada con fines informativos y de participación para conocer la opinión pública de los vecinos
        sobre las próximas elecciones a concejales en la localidad.
      </p>
    `
  }}
/>

    </div>
  );
}

export default App;

