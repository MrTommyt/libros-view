import React, { useEffect, useState } from "react";
import BookCard from "./BookCard.jsx";
import { availableBooks } from "../data/books.js";

const BooksSection = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/Books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Filter states
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author &&
        book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.editorial &&
        book.editorial.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase()))
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="filter-options">
            <select
              className="filter-select"
              // value={selectedGenre}
              // onChange={(e) => setSelectedGenre(e.target.value)}
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
            <select
              className="filter-select"
              // value={selectedCondition}
              // onChange={(e) => setSelectedCondition(e.target.value)}
            >
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
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="no-results">
              No se encontraron libros con esos filtros.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
