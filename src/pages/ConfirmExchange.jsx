import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider"; // Ajusta el path si es necesario
import { useNavigate, useParams } from "react-router-dom";

export default function ConfirmExchange() {
    const { bookId } = useParams();
    const { user, token } = useAuth();
    const [myBooks, setMyBooks] = useState([]);
    const [myBookId, setMyBookId] = useState("");
    const [bookDetail, setBookDetail] = useState(null);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Trae mis libros publicados
    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:8080/api/v1/books/mine", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("No se pudieron cargar tus libros.");
                return res.json();
            })
            .then((data) => setMyBooks(Array.isArray(data) ? data : []))
            .catch(() => setMyBooks([]));
    }, [user, token]);

    // Trae detalle del libro solicitado (para obtener info y dueño)
    useEffect(() => {
        if (!token) return;
        fetch(`http://localhost:8080/api/v1/books/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("No se pudo obtener el detalle del libro");
                return res.json();
            })
            .then((data) => setBookDetail(data))
            .catch(() => setBookDetail(null));
    }, [bookId, token]);

    const handleConfirm = async () => {
        setMsg("");
        setError("");
        // Usar clientId directo
        const toUserId = bookDetail?.clientId;

        if (!myBookId || !toUserId) {
            setError("Selecciona un libro propio y asegúrate que el libro a solicitar tenga dueño.");
            return;
        }

        const payload = {
            bookRequestId: bookId,
            bookOfferedId: myBookId,
            toUserId,
        };
        // Debug: muestra en consola para verificar que todo está correcto
        console.log("DEBUG - Token being sent:", token);
        console.log("DEBUG - Payload:", payload);

        try {
            const res = await fetch("http://localhost:8080/exchange", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || `HTTP ${res.status}`);
            }
            setMsg("¡Intercambio solicitado exitosamente!");
            setTimeout(() => navigate("/my-exchanges/sent"), 2000);
        } catch (e) {
            setError("Error al solicitar intercambio: " + e.message);
        }
    };

    if (!user) {
        return <div>Debes iniciar sesión para solicitar intercambios.</div>;
    }

    return (
        <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
            <h2>Confirmar solicitud de intercambio</h2>
            <div style={{ marginBottom: 20 }}>
                <label htmlFor="myBook">Selecciona el libro que ofreces:</label>
                <select
                    id="myBook"
                    value={myBookId}
                    onChange={(e) => setMyBookId(e.target.value)}
                    style={{ width: "100%", padding: 8, marginTop: 5 }}
                >
                    <option value="">Selecciona uno de tus libros</option>
                    {myBooks.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.bookDefinition?.title || book.title}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ marginBottom: 20 }}>
                Vas a solicitar:{" "}
                <b>{bookDetail?.bookDefinition?.title || bookDetail?.title || "-"}</b>
                <br />
                {bookDetail && (
                    <>
                        {/* Muestra el nombre o id del dueño, seguro */}
                        Dueño del libro: <b>{bookDetail.clientName || bookDetail.clientId || "-"}</b>
                    </>
                )}
                {!bookDetail && (
                    <span style={{ color: "red" }}>
                        No se pudo obtener el detalle del libro.
                    </span>
                )}
            </div>
            <button
                onClick={handleConfirm}
                disabled={!myBookId || !bookDetail || !bookDetail.clientId}
                style={{ padding: "10px 30px", cursor: "pointer" }}
            >
                Confirmar intercambio
            </button>
            {msg && <div style={{ color: "green", marginTop: 14 }}>{msg}</div>}
            {error && <div style={{ color: "red", marginTop: 14 }}>{error}</div>}
        </div>
    );
}
