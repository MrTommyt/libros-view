import React, { useEffect, useMemo, useState } from "react";
import BookCard from "../components/BookCard.jsx";

const AllBooks = ({ api = "http://localhost:8080/api/v1/books" }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(api, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!ignore) setBooks(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (!ignore) {
          setError("No fue posible cargar los libros publicados.");
          setBooks([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [api]);

  // 1) Normaliza: Book -> campos planos desde bookDefinition
  const normalized = useMemo(() => {
    return (Array.isArray(books) ? books : []).map((b) => {
      const d = b.bookDefinition || {};
      return {
        id: b.id,
        state: b.state ?? "",
        title: d.title ?? "",
        author: d.author ?? "",
        editorial: d.editorial ?? "",
        isbn: d.isbn ?? "",
        _raw: b, // por si necesitas el objeto original
      };
    });
  }, [books]);

  // 2) Filtro por término de búsqueda
  const q = searchTerm.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return normalized;
    return normalized.filter(
        (x) =>
            x.title.toLowerCase().includes(q) ||
            x.author.toLowerCase().includes(q) ||
            x.editorial.toLowerCase().includes(q) ||
            x.isbn.toLowerCase().includes(q)
    );
  }, [normalized, q]);

  return (
      <section className="books-page books-section">
        <div className="container">
          <h2 className="title-center">Todos los libros disponibles</h2>

          {/* Barra de búsqueda */}
          <div className="search-filter-bar">
            <div className="search-box">
              <input
                  type="text"
                  placeholder="Buscar por título, autor o ISBN..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">🔍</button>
            </div>

            {/* Si aún no tienes género/condición en el modelo, déjalos deshabilitados */}
            <div className="filter-options">
              <select className="filter-select" disabled><option>Todos los géneros</option></select>
              <select className="filter-select" disabled><option>Todas las condiciones</option></select>
            </div>
          </div>

          {/* Contenido */}
          <div className="books-grid">
            {loading && <p>Cargando libros...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && filtered.length === 0 && <p>No se encontraron libros.</p>}
            {!loading && !error && filtered.map((b) => (
                <BookCard
                    key={b.id}
                    book={{
                      id: b.id,
                      title: b.title,
                      author: b.author,
                      editorial: b.editorial,
                      isbn: b.isbn,
                      state: b.state,
                    }}
                />
            ))}
          </div>
        </div>
      </section>
  );
};

export default AllBooks;
