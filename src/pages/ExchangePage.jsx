import React, { useEffect, useState } from "react";
import "../styles/ExchangePage.css";

const ExchangePage = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [targetBook, setTargetBook] = useState({
    id: 99,
    title: "Orgullo y Prejuicio",
    author: "Jane Austen",
    owner: "Carlos López",
  });

  useEffect(() => {
    const mockMyBooks = [
      { id: 1, title: "El Principito", author: "Antoine de Saint-Exupéry" },
      {
        id: 2,
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
      },
      { id: 3, title: "Rayuela", author: "Julio Cortázar" },
    ];
    setMyBooks(mockMyBooks);
  }, []);

  const handleExchange = () => {
    if (!selectedBook) {
      alert("Por favor selecciona uno de tus libros para intercambiar.");
      return;
    }

    console.log(
      `Intercambiando mi libro '${selectedBook.title}' por '${targetBook.title}'`
    );
    alert(
      `Has solicitado intercambiar '${selectedBook.title}' por '${targetBook.title}'`
    );
  };

  return (
    <div className="exchange-container">
      <h2>Solicitud de Intercambio</h2>

      <div className="exchange-content">
        {/* Libro objetivo */}
        <div className="target-book">
          <h3>Libro que deseas obtener</h3>
          <div className="book-card target">
            <h4>{targetBook.title}</h4>
            <p>Autor: {targetBook.author}</p>
            <p>Propietario: {targetBook.owner}</p>
          </div>
        </div>

        {/* Libros disponibles del usuario */}
        <div className="my-books">
          <h3>Selecciona uno de tus libros para intercambiar</h3>
          <div className="books-grid">
            {myBooks.map((book) => (
              <div
                key={book.id}
                className={`book-card selectable ${
                  selectedBook?.id === book.id ? "selected" : ""
                }`}
                onClick={() => setSelectedBook(book)}
              >
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="exchange-btn" onClick={handleExchange}>
        Intercambiar
      </button>
    </div>
  );
};

export default ExchangePage;
