import React, { useState } from "react";
import BookCard from "./BookCard.jsx";
import { availableBooks } from "../data/books.js";

const BooksSection = () => {
  const [selectedGenre, setSelectedGenre] = useState("Todos los géneros");

  const filteredBooks = availableBooks.filter((book) => {
    if (selectedGenre === "Todos los géneros") return true;
    return book.genre.some((g) =>
      g.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  });

  return (
    <section className="books-section" id="books">
      <div className="container">
        <div className="section-header">
          <h2>Libros Disponibles para Intercambio</h2>
          <p>
            Descubre la variedad de libros que nuestra comunidad tiene para
            ofrecer
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar por título, autor o género..."
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="filter-options">
            <select
              className="filter-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option>Todos los géneros</option>
              <option>Novela</option>
              <option>Realismo mágico</option>
              <option>Clásicos</option>
              <option>Ciencia ficción</option>
              <option>Romance</option>
              <option>Filosofía</option>
              <option>Ficción distópica</option>
              <option>Literatura infantil</option>
              <option>Aventuras</option>
              <option>Policial</option>
              <option>Satírico</option>
            </select>
            <select className="filter-select">
              <option>Todas las condiciones</option>
              <option>Como nuevo</option>
              <option>Excelente</option>
              <option>Bueno</option>
              <option>Regular</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
