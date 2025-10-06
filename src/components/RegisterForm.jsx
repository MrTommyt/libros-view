import React from "react";
import "../styles/Book.css";

const RegisterForm = ({ onSwitch }) => {
  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <input type="text" placeholder="Nombre" />
      <input type="text" placeholder="Dirección" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Contraseña" />
      <button>¡Vamos!</button>
      <p>
        ¿Ya tienes una cuenta?{" "}
        <span className="link" onClick={onSwitch}>
          Inicia Sesión
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
