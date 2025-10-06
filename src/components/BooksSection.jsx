"use client"

import { useEffect, useMemo, useState } from "react"
import BookCard from "../components/BookCard.jsx"
import { Link } from "react-router-dom"

const BooksSection = ({ limit = 6, api = "http://localhost:8080/api/v1/books/all" }) => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false
        ;(async () => {
            try {
                const res = await fetch(api, { headers: { Accept: "application/json" } })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                if (!ignore) setBooks(Array.isArray(data) ? data : [])
            } catch (e) {
                if (!ignore) {
                    setError("No fue posible cargar los libros publicados.")
                    setBooks([])
                }
            } finally {
                if (!ignore) setLoading(false)
            }
        })()
        return () => {
            ignore = true
        }
    }, [api])

    const normalized = useMemo(
        () =>
            (Array.isArray(books) ? books : []).map((b) => {
                const d = b.bookDefinition || {}
                return {
                    id: b.id,
                    state: b.state ?? "",
                    title: d.title ?? "",
                    author: d.author ?? "",
                    editorial: d.editorial ?? "",
                    isbn: d.isbn ?? "",
                    _raw: b,
                }
            }),
        [books],
    )

    const q = searchTerm.trim().toLowerCase()
    const filtered = useMemo(() => {
        if (!q) return normalized
        return normalized.filter(
            (x) =>
                x.title.toLowerCase().includes(q) ||
                x.author.toLowerCase().includes(q) ||
                x.editorial.toLowerCase().includes(q) ||
                x.isbn.toLowerCase().includes(q),
        )
    }, [normalized, q])

    const visible = limit ? filtered.slice(0, limit) : filtered

    return (
        <section className="books-page books-section fade-in">
            <div className="container">
                <h2
                    className="title-center"
                    style={{
                        color: "#1f2937",
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 700,
                        marginBottom: 40,
                        letterSpacing: "-0.01em",
                        fontSize: "2rem",
                    }}
                >
                    Todos los Libros disponibles
                </h2>

                <div className="search-filter-bar fade-in">
                    <div
                        className="search-box"
                        style={{
                            display: "flex",
                            gap: "0.75rem",
                            marginBottom: "1.5rem",
                            maxWidth: "800px",
                            margin: "0 auto 1.5rem",
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Buscar por título, autor o ISBN..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flex: 1,
                                padding: "0.875rem 1.125rem",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                fontSize: "0.95rem",
                                background: "#ffffff",
                                color: "#1f2937",
                                transition: "all 0.2s ease",
                                outline: "none",
                            }}
                        />
                        <button
                            className="search-btn"
                            tabIndex={-1}
                            aria-label="Buscar"
                            type="button"
                            style={{
                                padding: "0.875rem 1.5rem",
                                borderRadius: "8px",
                                background: "#6366f1",
                                color: "#ffffff",
                                border: "none",
                                fontSize: "1.125rem",
                                cursor: "pointer",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.2s ease",
                            }}
                        >
                            🔍
                        </button>
                    </div>
                    <div
                        className="filter-options"
                        style={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <select
                            className="filter-select"
                            disabled
                            style={{
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                fontSize: "0.9rem",
                                background: "#f9fafb",
                                color: "#6b7280",
                                cursor: "not-allowed",
                                minWidth: "200px",
                            }}
                        >
                            <option>Todos los géneros</option>
                        </select>
                        <select
                            className="filter-select"
                            disabled
                            style={{
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                fontSize: "0.9rem",
                                background: "#f9fafb",
                                color: "#6b7280",
                                cursor: "not-allowed",
                                minWidth: "200px",
                            }}
                        >
                            <option>Todas las condiciones</option>
                        </select>
                    </div>
                </div>

                <div className="books-grid fade-in">
                    {loading &&
                        [...Array(limit || 6)].map((_, i) => (
                            <div
                                key={i}
                                className="book-card skeleton"
                                style={{
                                    height: "320px",
                                    borderRadius: "12px",
                                    background: "linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)",
                                    backgroundSize: "200% 100%",
                                }}
                            />
                        ))}
                    {error && (
                        <p
                            style={{
                                color: "#ef4444",
                                fontWeight: 600,
                                fontSize: "1.1rem",
                            }}
                        >
                            {error}
                        </p>
                    )}
                    {!loading &&
                        !error &&
                        visible.length > 0 &&
                        visible.map((b) => (
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
                    {!loading && !error && !visible.length && (
                        <p
                            className="no-results"
                            style={{
                                color: "#64748b",
                                fontSize: "1.05rem",
                            }}
                        >
                            No se encontraron libros.
                        </p>
                    )}
                </div>

                <div
                    className="view-all"
                    style={{
                        textAlign: "center",
                        marginTop: "3rem",
                    }}
                >
                    <Link to="/AllBooks">
                        <button
                            className="btn-view-all"
                            style={{
                                padding: "0.875rem 2rem",
                                borderRadius: "8px",
                                background: "#6366f1",
                                color: "#ffffff",
                                border: "none",
                                fontWeight: 600,
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Ver todos los libros
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default BooksSection
