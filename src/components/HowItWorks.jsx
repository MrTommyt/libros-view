import React from 'react';

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <h2>¿Cómo Funciona?</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Regístrate</h3>
            <p>Crea tu cuenta gratuita y únete a nuestra comunidad de lectores</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Publica tus Libros</h3>
            <p>Sube fotos y detalles de los libros que quieres intercambiar</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Explora y Solicita</h3>
            <p>Busca libros que te interesen y solicita intercambios con otros usuarios</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Intercambia</h3>
            <p>Coordina con el propietario para realizar el intercambio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;