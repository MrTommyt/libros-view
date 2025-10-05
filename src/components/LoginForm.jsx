import React from "react";
import "../styles/Book.css";

const LoginForm = ({ onSwitch }) => {
  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Contraseña" />
      <button>¡Vamos!</button>
      <p>
        ¿Aún no tienes una cuenta?{" "}
        <span className="link" onClick={onSwitch}>
          Regístrate
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
