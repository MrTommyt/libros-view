import React from "react";

const BookCard = ({ book }) => (
  <div className="book-card">
    {/* <img src={book.image} alt={book.title} className="book-image" /> */}
    <div className="book-info">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Por {book.author}</p>
      <p className="book-editorial">{book.editorial}</p>
      <p className="book-isbn">ISBN: {book.isbn}</p>
      {/* <p className="book-genre">{book.genre}</p>
      <p className="book-owner">Propietario: {book.owner}</p>
      <p className="book-condition">Estado: {book.condition}</p> */}
      <div className="book-actions">
        <button className="btn-primary">Solicitar Intercambio</button>
        <button className="btn-details">Ver Detalles</button>
      </div>
    </div>
  </div>
);

export default BookCard;
