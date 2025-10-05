import React, { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import "../styles/Book.css";

const Book = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="book-container">
      <div className="book">
        {/* Página izquierda fija (logo) */}
        <div className="page left">
          {/* <img src={logo} alt="Logo" className="logo" /> */}
          <div className="logo-placeholder">Logo</div>
        </div>

        {/* Página derecha que gira */}
        <div className={`page-right ${flipped ? "flipped" : ""}`}>
          <div className="page-front">
            <LoginForm onSwitch={() => setFlipped(true)} />
          </div>
          <div className="page-back">
            <RegisterForm onSwitch={() => setFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
