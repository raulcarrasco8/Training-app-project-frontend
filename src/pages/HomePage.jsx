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
        <h1 className="hero-title">Welcome to Training App</h1>
        <p className="hero-subtitle">Plan, log and review your workouts across every discipline.</p>
        <div className="hero-actions">
          <a className="cta-btn" href="/signup">Get started</a>
          <a className="ghost-btn" href="/workouts">View workouts</a>
        </div>
      </section>

     
      <div className="homeDisciplines">
        <a className="AddDisciplines-btn" href="/disciplines">Manage your disciplines</a>
      </div>
      
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Create and edit workouts</li>
          <li>Full workout history</li>
          <li>Simple, responsive interface</li>
        </ul>
      </section>
    </main>
  );
}
