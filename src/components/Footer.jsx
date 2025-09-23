import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>📚 BiblioIntercambio</h3>
            <p>La plataforma que conecta lectores y facilita el intercambio de libros</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><a href="#books">Libros Disponibles</a></li>
              <li><a href="#how-it-works">¿Cómo Funciona?</a></li>
              <li><a href="#about">Acerca de</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Soporte</h4>
            <ul>
              <li><a href="#help">Centro de Ayuda</a></li>
              <li><a href="#faq">Preguntas Frecuentes</a></li>
              <li><a href="#terms">Términos de Uso</a></li>
              <li><a href="#privacy">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BiblioIntercambio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;