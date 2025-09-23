import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>📚 BiblioIntercambio</h1>
          </div>
          <nav className="navigation">
            <div className="nav-links">
              <a href="#books">Libros Disponibles</a>
              <a href="#how-it-works">¿Cómo Funciona?</a>
              <a href="#about">Acerca de</a>
            </div>
            <div className="auth-buttons">
              <button className="btn-login">Iniciar Sesión</button>
              <button className="btn-register">Registrarse</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;