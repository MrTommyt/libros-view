"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthProvider"
import BookCard from "../components/BookCard"

export default function MyBooks() {
    const { token, user } = useAuth()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/api/v1/books/mine", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`)
                    return res.json()
                })
                .then((data) => setBooks(Array.isArray(data) ? data : []))
                .catch(() => setError("No se pudieron cargar tus libros."))
                .finally(() => setLoading(false))
        }
    }, [token])

    if (!user)
        return (
            <div
                className="fade-in"
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: "#ef4444",
                }}
            >
                Debes iniciar sesión para ver tus libros.
            </div>
        )
    if (loading)
        return (
            <div
                className="fade-in"
                style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}
            >
                Cargando tus libros...
            </div>
        )
    if (error)
        return (
            <div
                className="fade-in"
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#dc2626",
                    fontSize: 18,
                }}
            >
                Error: {error}
            </div>
        )

    return (
        <div className="my-books-page fade-in" style={{ maxWidth: 1000, margin: "0 auto", minHeight: "70vh" }}>
            <h2
                style={{
                    color: "var(--primary)",
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700,
                    marginBottom: 24,
                }}
            >
                Mis libros publicados ({books.length})
            </h2>
            {books.length === 0 ? (
                <div
                    className="card fade-in"
                    style={{
                        textAlign: "center",
                        background: "var(--surface)",
                        padding: "2.2rem 1.2rem",
                        borderRadius: "var(--radius)",
                        fontSize: 17,
                        color: "#6b7280",
                    }}
                >
                    No tienes libros publicados aún.{" "}
                    <a href="/publish" style={{ color: "var(--primary)" }}>
                        ¡Publica tu primer libro!
                    </a>
                </div>
            ) : (
                <div className="books-grid fade-in">
                    {books.map((b) => (
                        <BookCard
                            key={b.id}
                            book={{
                                id: b.id,
                                title: b.bookDefinition?.title ?? b.title ?? "Sin título",
                                author: b.bookDefinition?.author ?? b.author ?? "Autor desconocido",
                                editorial: b.bookDefinition?.editorial ?? b.editorial ?? "",
                                isbn: b.bookDefinition?.isbn ?? b.isbn ?? "",
                                state: b.state ?? "",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
