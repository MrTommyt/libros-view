import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import BookCard from "../components/BookCard";

export default function MyBooks() {
    const { token, user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/api/v1/books/mine", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(data => setBooks(Array.isArray(data) ? data : []))
                .catch(e => setError("No se pudieron cargar tus libros."))
                .finally(() => setLoading(false));
        }
    }, [token]);

    if (!user) return <div>Debes iniciar sesión para ver tus libros.</div>;
    if (loading) return <div>Cargando tus libros...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="my-books-page">
            <h2>Mis libros publicados ({books.length})</h2>
            {books.length === 0 ? (
                <p>No tienes libros publicados aún. <a href="/publish">¡Publica tu primer libro!</a></p>
            ) : (
                <div className="books-grid">
                    {books.map(b => (
                        <BookCard
                            key={b.id}
                            book={{
                                id: b.id,
                                title: b.bookDefinition?.title ?? b.title ?? "Sin título",
                                author: b.bookDefinition?.author ?? b.author ?? "Autor desconocido",
                                editorial: b.bookDefinition?.editorial ?? b.editorial ?? "",
                                isbn: b.bookDefinition?.isbn ?? b.isbn ?? "",
                                state: b.state ?? ""
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
