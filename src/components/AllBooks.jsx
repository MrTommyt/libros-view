import React, { useEffect, useMemo, useState } from "react";
import BookCard from "../components/BookCard.jsx";
import { useAuth } from "../auth/AuthProvider";

const AllBooks = () => {
    const { token, user } = useAuth();
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        if (!token) {
            setLoading(false);
            return;
        }
        (async () => {
            try {
                const res = await fetch("http://localhost:8080/api/v1/books/others", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!ignore) setBooks(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
                if (!ignore) {
                    setError("No fue posible cargar los libros de otros usuarios.");
                    setBooks([]);
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        })();
        return () => { ignore = true; };
    }, [token]);

    // Normaliza datos obtenidos del backend
    const normalized = useMemo(() => {
        return (Array.isArray(books) ? books : []).map((b) => {
            const d = b.bookDefinition || {};
            return {
                id: b.id,
                state: b.state ?? "",
                stateRequest: b.stateRequest ?? "", // <-- Incluye el campo de estado
                title: d.title ?? "",
                author: d.author ?? "",
                editorial: d.editorial ?? "",
                isbn: d.isbn ?? "",
                clientId: b.client?.id || b.clientId,
                _raw: b,
            };
        });
    }, [books]);

    // Filtro búsqueda por texto
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

    // Filtro final SOLO libros publicados (no intercambiados ni eliminados)
    const onlyPublished = filtered.filter(book => book.stateRequest === "PUBLICADO");

    if (!user) {
        return (
            <section className="books-page books-section">
                <div className="container">
                    <h2 className="title-center">Inicia sesión para ver libros disponibles para intercambio</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="books-page books-section">
            <div className="container">
                <h2 className="title-center">Libros disponibles para intercambio</h2>
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
                    <div className="filter-options">
                        <select className="filter-select" disabled>
                            <option>Todos los géneros</option>
                        </select>
                        <select className="filter-select" disabled>
                            <option>Todas las condiciones</option>
                        </select>
                    </div>
                </div>
                {/* Grid de libros filtrados y publicados */}
                <div className="books-grid">
                    {loading && <p>Cargando libros...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && onlyPublished.length === 0 && (
                        <p>No se encontraron libros disponibles para intercambio.</p>
                    )}
                    {!loading && !error && onlyPublished.map((b) => (
                        <BookCard
                            key={b.id}
                            book={{
                                id: b.id,
                                title: b.title,
                                author: b.author,
                                editorial: b.editorial,
                                isbn: b.isbn,
                                state: b.state,
                                clientId: b.clientId,
                            }}
                            showExchangeButton={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllBooks;
