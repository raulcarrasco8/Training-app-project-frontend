import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <h1 className="hero-title">Bienvenido a Training App</h1>
        <p className="hero-subtitle">Diseña, registra y sigue tus entrenamientos fácilmente.</p>
        <div className="hero-actions">
          <a className="cta-btn" href="/signup">Comenzar</a>
          <a className="ghost-btn" href="/workouts">Ver entrenamientos</a>
        </div>
      </section>

      <section className="features">
        <h2>Características</h2>
        <ul>
          <li>Crear y editar rutinas</li>
          <li>Historico de entrenamientos</li>
          <li>Interfaz simple y responsiva</li>
        </ul>
      </section>

      <section className="editable-note">
        <h3>Personaliza esta página</h3>
        <p>Edita src/pages/HomePage.jsx y src/pages/HomePage.css para cambiar texto, estructura y estilos.</p>
      </section>
    </main>
  );
}
