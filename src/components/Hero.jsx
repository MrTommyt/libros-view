import React from 'react';
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h2>Intercambia Libros, Comparte Conocimiento</h2>
          <p>
            Únete a nuestra comunidad de lectores. Publica tus libros y descubre nuevas historias 
            intercambiando con otros usuarios de manera gratuita.
          </p>
          <div className="hero-actions">
            <button className="btn-cta" onClick={() => navigate("/publish")}>Publicar Mi Libro</button>
            <button className="btn-secondary">Explorar Libros</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;