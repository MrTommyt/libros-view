import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard.jsx";
import { Link } from "react-router-dom";

const BooksSection = () => {
  const [books, setBooks] = useState([]);           // lista de libros
  const [searchTerm, setSearchTerm] = useState(""); // búsqueda
  const [loading, setLoading] = useState(true);     // carga
  const [error, setError] = useState(null);         // errores

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/titles");
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data = await response.json();
        console.log("Books recibido:", data);

        // Garantiza que books siempre sea un array
        setBooks(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message || "Error desconocido");
        setBooks([]); // protección extra
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filtrado seguro
  const filteredBooks = Array.isArray(books)
      ? books.filter((book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.editorial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : [];

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
          {/* Botón Ver todos los libros */}
          <div className="view-all">
            <Link to="/AllBooks">
              <button className="btn-view-all">Ver todos los libros</button>
            </Link>
          </div>
        </div>
      </section>
  );
};


export default BooksSection;