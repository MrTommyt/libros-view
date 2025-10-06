import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function MySentExchanges() {
    const { token } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/exchange/sent", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(data => setRequests(Array.isArray(data) ? data : []))
                .catch(e => setError("No se pudieron cargar tus solicitudes enviadas: " + e.message))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    if (loading) return <div>Cargando solicitudes enviadas...</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2>Solicitudes enviadas ({requests.length})</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {requests.map(req => (
                    <li
                        key={req.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            margin: "16px 0",
                            padding: "16px",
                            background: "#181818",
                            color: "#fff"
                        }}
                    >
                        <div>
                            <b>Libro solicitado:</b> {req.bookRequested?.bookDefinition?.title || "-"}
                        </div>
                        <div>
                            <b>Dueño del libro:</b> {req.toUser?.name || req.toUser?.email || "-"}
                        </div>
                        <div>
                            <b>Libro ofrecido:</b> {req.bookOffered?.bookDefinition?.title || "-"}
                        </div>
                        <div>
                            <b>Tu estado del libro ofrecido:</b> {req.bookOffered?.state || "-"}
                        </div>
                        <div>
                            <b>Estado de la solicitud:</b> <span
                            style={{
                                color:
                                    req.status === "COMPLETED"
                                        ? "lightgreen"
                                        : req.status === "REJECTED"
                                            ? "#ff7373"
                                            : "#fc0"
                            }}
                        >
                              {req.status || "-"}
                            </span>
                        </div>
                        <div>
                            <b>Fecha de creación:</b>{" "}
                            {req.createdDate
                                ? new Date(req.createdDate).toLocaleString()
                                : "-"}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
