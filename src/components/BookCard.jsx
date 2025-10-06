"use client"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

const BookCard = ({ book, showExchangeButton = false }) => {
    const navigate = useNavigate()
    const { user } = useAuth()

    const canRequestExchange = showExchangeButton && user && book.clientId !== user.clientId

    const handleExchangeClick = () => {
        navigate(`/exchange/confirm/${book.id}`)
    }

    return (
        <div className="book-card fade-in">
            <div className="book-info">
                <h3
                    className="book-title"
                    style={{
                        fontWeight: 700,
                        color: "#6366f1",
                        fontSize: "1.35rem",
                        marginBottom: "0.5rem",
                        lineHeight: 1.3,
                    }}
                >
                    {book.title}
                </h3>
                <p
                    className="book-author"
                    style={{
                        fontStyle: "italic",
                        color: "#64748b",
                        fontSize: "0.95rem",
                        marginBottom: "0.75rem",
                    }}
                >
                    Por {book.author}
                </p>
                {book.editorial && (
                    <p
                        className="book-genre"
                        style={{
                            fontSize: 14,
                            color: "#475569",
                            marginBottom: "0.4rem",
                        }}
                    >
                        Editorial: {book.editorial}
                    </p>
                )}
                <p
                    className="book-isbn"
                    style={{
                        fontSize: 13,
                        color: "#94a3b8",
                        marginBottom: "0.4rem",
                    }}
                >
                    ISBN: {book.isbn}
                </p>
                <p
                    className="book-condition"
                    style={{
                        fontSize: 14,
                        marginBottom: "1rem",
                    }}
                >
                    Estado:{" "}
                    <span
                        style={{
                            color: "#8b5cf6",
                            fontWeight: 600,
                            background: "#f5f3ff",
                            padding: "2px 8px",
                            borderRadius: "4px",
                        }}
                    >
            {book.state}
          </span>
                </p>
                <div
                    className="book-actions"
                    style={{
                        marginTop: 16,
                        gap: "0.75rem",
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {canRequestExchange && (
                        <button className="btn-primary" onClick={handleExchangeClick}>
                            Solicitar Intercambio
                        </button>
                    )}
                    <button
                        className="btn-details"
                        style={{
                            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                            color: "#fff",
                            border: "none",
                            padding: "0.6rem 1.2rem",
                            borderRadius: "8px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: "0 2px 8px rgba(139, 92, 246, 0.3)",
                        }}
                        onClick={() => navigate(`/books/details/${book.id}`)}
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard
