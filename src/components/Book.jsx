import React, { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import "../styles/Book.css";

const Book = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="book-container">
      <div className={`book ${flipped ? "flipped" : ""}`}>
        <div className="page front">
          <LoginForm onSwitch={() => setFlipped(true)} />
        </div>
        <div className="page back">
          <RegisterForm onSwitch={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

export default Book;
