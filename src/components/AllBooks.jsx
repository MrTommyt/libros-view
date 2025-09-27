import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard.jsx";

const AllBooks = () => {
  const [books, setBooks] = useState([]);          // lista de libros
  const [searchTerm, setSearchTerm] = useState(""); // texto de búsqueda
  const [loading, setLoading] = useState(true);    // estado de carga
  const [error, setError] = useState(null);        // mensaje de error

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/titles");
        if (!response.ok) throw new Error("Error al obtener los libros");

        const data = await response.json();
        console.log("Respuesta del backend:", data);

        // Siempre forzar a que books sea un array
        if (Array.isArray(data)) {
          setBooks(data);
        } else if (Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.warn("El backend no devolvió un array de libros válido");
          setBooks([]);
        }

      } catch (err) {
        console.error(err);
        setError(err.message || "Error desconocido");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filtrado seguro
  const filteredBooks = Array.isArray(books)
      ? books.filter((book) => {
        return (
            book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.editorial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      : [];

  return (
      <section className="books-page books-section">
        <div className="container">
          <h2 className="title-center">Todos los libros disponibles</h2>

          {/* Barra de búsqueda */}
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

          {/* Contenido */}
          <div className="books-grid">
            {loading && <p>Cargando libros...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && filteredBooks.length === 0 && (
                <p>No se encontraron libros.</p>
            )}
            {!loading &&
                !error &&
                filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book}/>
                ))}
          </div>
        </div>
      </section>
  );
};

export default AllBooks;