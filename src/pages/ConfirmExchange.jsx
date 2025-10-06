"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../auth/AuthProvider"
import { useNavigate, useParams } from "react-router-dom"

export default function ConfirmExchange() {
    const { bookId } = useParams()
    const { user, token } = useAuth()
    const [myBooks, setMyBooks] = useState([])
    const [myBookId, setMyBookId] = useState("")
    const [bookDetail, setBookDetail] = useState(null)
    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) return
        fetch("http://localhost:8080/api/v1/books/mine", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("No se pudieron cargar tus libros.")
                return res.json()
            })
            .then((data) => setMyBooks(Array.isArray(data) ? data : []))
            .catch(() => setMyBooks([]))
    }, [user, token])

    useEffect(() => {
        if (!token) return
        fetch(`http://localhost:8080/api/v1/books/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("No se pudo obtener el detalle del libro")
                return res.json()
            })
            .then((data) => setBookDetail(data))
            .catch(() => setBookDetail(null))
    }, [bookId, token])

    const handleConfirm = async () => {
        setMsg("")
        setError("")
        const toUserId = bookDetail?.clientId

        if (!myBookId || !toUserId) {
            setError("Selecciona un libro propio y asegúrate que el libro a solicitar tenga dueño.")
            return
        }

        const payload = {
            bookRequestId: bookId,
            bookOfferedId: myBookId,
            toUserId,
        }

        try {
            const res = await fetch("http://localhost:8080/exchange", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
            if (!res.ok) {
                const errorText = await res.text()
                throw new Error(errorText || `HTTP ${res.status}`)
            }
            setMsg("¡Intercambio solicitado exitosamente!")
            setTimeout(() => navigate("/my-exchanges/sent"), 1800)
        } catch (e) {
            setError("Error al solicitar intercambio: " + e.message)
        }
    }

    if (!user) {
        return (
            <div
                className="fade-in"
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 18,
                    color: "#ef4444",
                    fontWeight: 600,
                    background: "rgba(239, 68, 68, 0.05)",
                    borderRadius: "16px",
                    padding: "2rem",
                    margin: "2rem",
                }}
            >
                Debes iniciar sesión para solicitar intercambios.
            </div>
        )
    }

    return (
        <div
            className="fade-in"
            style={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem 1rem",
            }}
        >
            <div
                className="card"
                style={{
                    maxWidth: 520,
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 20px 60px rgba(139, 92, 246, 0.25), 0 8px 20px rgba(0, 0, 0, 0.12)",
                    borderRadius: "16px",
                    padding: "2.5rem 2.25rem",
                    border: "1px solid rgba(139, 92, 246, 0.15)",
                }}
            >
                <h2
                    style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 700,
                        color: "#8b5cf6",
                        marginBottom: 24,
                        fontSize: "1.75rem",
                    }}
                >
                    Confirmar solicitud de intercambio
                </h2>
                <div style={{ marginBottom: 24 }}>
                    <label
                        htmlFor="myBook"
                        style={{
                            fontWeight: 600,
                            marginBottom: 8,
                            display: "block",
                            color: "#374151",
                            fontSize: "0.95rem",
                        }}
                    >
                        Selecciona el libro que ofreces:
                    </label>
                    <select
                        id="myBook"
                        value={myBookId}
                        onChange={(e) => setMyBookId(e.target.value)}
                        className="select"
                        style={{
                            width: "100%",
                            fontSize: 15,
                            marginTop: 8,
                            marginBottom: 12,
                            padding: "0.875rem 1.125rem",
                            borderRadius: "12px",
                            border: "2px solid rgba(139, 92, 246, 0.2)",
                            background: "#fff",
                            color: "#1f2937",
                            transition: "all 0.2s ease",
                        }}
                    >
                        <option value="">Selecciona uno de tus libros</option>
                        {myBooks.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.bookDefinition?.title || book.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    style={{
                        marginBottom: 24,
                        fontSize: 15,
                        padding: "1.25rem",
                        background: "rgba(139, 92, 246, 0.05)",
                        borderRadius: "12px",
                        border: "1px solid rgba(139, 92, 246, 0.15)",
                        lineHeight: "1.7",
                    }}
                >
                    Vas a solicitar:{" "}
                    <b style={{ color: "#8b5cf6" }}>{bookDetail?.bookDefinition?.title || bookDetail?.title || "-"}</b>
                    <br />
                    {bookDetail && (
                        <>
                            Dueño del libro: <b style={{ color: "#7c3aed" }}>{bookDetail.clientName || bookDetail.clientId || "-"}</b>
                        </>
                    )}
                    {!bookDetail && (
                        <span style={{ color: "#ef4444", fontWeight: 600 }}>No se pudo obtener el detalle del libro.</span>
                    )}
                </div>
                <button
                    onClick={handleConfirm}
                    disabled={!myBookId || !bookDetail || !bookDetail.clientId}
                    className="btn-primary"
                    style={{
                        width: "100%",
                        fontSize: 16,
                        padding: "1rem 0",
                        marginBottom: 12,
                        background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                        borderRadius: "12px",
                        border: "none",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                        transition: "all 0.2s ease",
                        opacity: !myBookId || !bookDetail || !bookDetail.clientId ? 0.5 : 1,
                    }}
                >
                    Confirmar intercambio
                </button>
                {msg && (
                    <div
                        className="alert fade-in"
                        style={{
                            background: "rgba(16, 185, 129, 0.1)",
                            color: "#065f46",
                            borderRadius: 12,
                            padding: "1rem 1.25rem",
                            margin: "12px 0 0 0",
                            fontSize: 15,
                            textAlign: "center",
                            fontWeight: 600,
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                    >
                        {msg}
                    </div>
                )}
                {error && (
                    <div
                        className="alert fade-in"
                        style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#991b1b",
                            borderRadius: 12,
                            padding: "1rem 1.25rem",
                            margin: "12px 0 0 0",
                            fontSize: 15,
                            textAlign: "center",
                            fontWeight: 600,
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                        }}
                    >
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}
