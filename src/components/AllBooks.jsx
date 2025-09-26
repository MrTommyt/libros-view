import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard.jsx"; // se importa desde components

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/Books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

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
    <section className="books-page books-section">
      <div className="container">
        <h2 className="title-center">Todos los Libros disponibles</h2>

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

        {/* Grid de libros */}
        <div className="books-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="no-results">No se encontraron libros.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
