"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthProvider"

export default function MySentExchanges() {
    const { token } = useAuth()
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/exchange/sent", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`)
                    return res.json()
                })
                .then((data) => setRequests(Array.isArray(data) ? data : []))
                .catch((e) => setError("No se pudieron cargar tus solicitudes enviadas: " + e.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [token])

    if (loading)
        return (
            <div
                className="fade-in"
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: "#6b7280",
                    fontWeight: 500,
                }}
            >
                Cargando solicitudes enviadas...
            </div>
        )
    if (error)
        return (
            <div
                className="fade-in"
                style={{
                    color: "#ef4444",
                    fontWeight: 600,
                    minHeight: "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    background: "rgba(239, 68, 68, 0.05)",
                    borderRadius: "16px",
                    padding: "2rem",
                    margin: "2rem",
                }}
            >
                {error}
            </div>
        )

    return (
        <div
            className="fade-in"
            style={{
                maxWidth: "800px",
                margin: "0 auto",
                minHeight: "70vh",
                padding: "2rem 1rem",
            }}
        >
            <h2
                style={{
                    color: "#8b5cf6",
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700,
                    marginBottom: 24,
                    fontSize: "2rem",
                }}
            >
                Solicitudes enviadas ({requests.length})
            </h2>
            {!requests.length && (
                <div
                    className="card fade-in"
                    style={{
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.95)",
                        padding: "3rem 2rem",
                        borderRadius: "16px",
                        fontSize: 17,
                        color: "#6b7280",
                        boxShadow: "0 10px 40px rgba(139, 92, 246, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)",
                    }}
                >
                    No has enviado ninguna solicitud de intercambio.
                </div>
            )}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {requests.map((req) => (
                    <li
                        key={req.id}
                        className="fade-in"
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            borderRadius: "16px",
                            margin: "16px 0",
                            padding: "1.75rem 2rem",
                            boxShadow: "0 10px 40px rgba(139, 92, 246, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)",
                            color: "#1f2937",
                            border: "1px solid rgba(139, 92, 246, 0.1)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                            <b style={{ color: "#374151" }}>Libro solicitado:</b>{" "}
                            <span style={{ color: "#8b5cf6", fontWeight: 600 }}>
                {req.bookRequested?.bookDefinition?.title || "-"}
              </span>
                        </div>
                        <div style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                            <b style={{ color: "#374151" }}>Dueño del libro:</b>{" "}
                            <span style={{ color: "#6b7280" }}>{req.toUser?.name || req.toUser?.email || "-"}</span>
                        </div>
                        <div style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                            <b style={{ color: "#374151" }}>Libro ofrecido:</b>{" "}
                            <span style={{ color: "#a78bfa", fontWeight: 600 }}>{req.bookOffered?.bookDefinition?.title || "-"}</span>
                        </div>
                        <div style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                            <b style={{ color: "#374151" }}>Tu estado del libro ofrecido:</b>{" "}
                            <span style={{ color: "#6b7280" }}>{req.bookOffered?.state || "-"}</span>
                        </div>
                        <div style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                            <b style={{ color: "#374151" }}>Estado de la solicitud:</b>
                            <span
                                style={{
                                    color: req.status === "COMPLETED" ? "#10b981" : req.status === "REJECTED" ? "#ef4444" : "#f59e0b",
                                    fontWeight: 700,
                                    marginLeft: "0.5rem",
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: "8px",
                                    background:
                                        req.status === "COMPLETED"
                                            ? "rgba(16, 185, 129, 0.1)"
                                            : req.status === "REJECTED"
                                                ? "rgba(239, 68, 68, 0.1)"
                                                : "rgba(245, 158, 11, 0.1)",
                                }}
                            >
                {req.status || "-"}
              </span>
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "1rem" }}>
                            <b>Fecha de creación:</b> {req.createdDate ? new Date(req.createdDate).toLocaleString() : "-"}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
