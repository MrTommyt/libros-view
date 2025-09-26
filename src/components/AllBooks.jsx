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
        const response = await fetch("http://localhost:8080/api/v1/books");
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
          <input
            type="text"
            placeholder="Buscar por título, autor, editorial o ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              <BookCard key={book.id} book={book} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
