import React from "react";
import "./HomePage.css";
import "../components/AddDiscipline"
import AddDiscipline from "../components/AddDiscipline";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
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

     
      <div className="homeDisciplines">
        <a className="AddDisciplines-btn" href="/disciplines">Añade tus deportes</a>
      </div>
      
      <section className="features">
        <h2>Características</h2>
        <ul>
          <li>Crear y editar rutinas</li>
          <li>Historico de entrenamientos</li>
          <li>Interfaz simple y responsiva</li>
        </ul>
      </section>
    </main>
  );
}
