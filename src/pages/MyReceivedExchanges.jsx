"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthProvider"

export default function MyReceivedExchanges() {
    const { token } = useAuth()
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/exchange/received", {
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
                .catch((e) => setError("No se pudieron cargar tus solicitudes recibidas: " + e.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [token])

    const handleStatus = async (id, status) => {
        try {
            await fetch(`http://localhost:8080/exchange/${id}/status?status=${status}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            setRequests((prev) => prev.filter((req) => req.id !== id))
        } catch (e) {
            alert("Error al actualizar estado: " + e.message)
        }
    }

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
                Cargando solicitudes recibidas...
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

    const pendingRequests = requests.filter((req) => req.status === "PENDING")

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
                Solicitudes recibidas ({pendingRequests.length})
            </h2>
            {!pendingRequests.length && (
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
                    No tienes solicitudes de intercambio pendientes.
                </div>
            )}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {pendingRequests.map((req) => (
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
                        <div style={{ fontSize: "1rem", lineHeight: "1.7", marginBottom: "1.25rem" }}>
              <span style={{ fontWeight: 600, color: "#8b5cf6", fontSize: "1.05rem" }}>
                {req.fromUser?.name || "Otro usuario"}
              </span>{" "}
                            te ofreció <b style={{ color: "#a78bfa" }}>{req.bookOffered?.bookDefinition?.title}</b>
                            <span>
                {" "}
                                por tu libro <b style={{ color: "#7c3aed" }}>{req.bookRequested?.bookDefinition?.title}</b>
              </span>
                        </div>
                        <div style={{ marginTop: 16, display: "flex", gap: "12px", flexWrap: "wrap" }}>
                            <button
                                className="btn-primary"
                                onClick={() => handleStatus(req.id, "COMPLETED")}
                                style={{
                                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                    padding: "0.75rem 1.75rem",
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    borderRadius: "12px",
                                    border: "none",
                                    color: "#fff",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Aceptar
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={() => handleStatus(req.id, "REJECTED")}
                                style={{
                                    background: "transparent",
                                    padding: "0.75rem 1.75rem",
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    borderRadius: "12px",
                                    border: "2px solid #ef4444",
                                    color: "#ef4444",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Rechazar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
