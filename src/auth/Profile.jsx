"use client"
import { useAuth } from "../auth/AuthProvider"
import { Link } from "react-router-dom"

export default function Profile() {
    const { user, logout } = useAuth()
    if (!user)
        return (
            <div
                className="profile-page fade-in"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "70vh",
                    fontSize: 18,
                    color: "#dc2626",
                    fontWeight: 500,
                }}
            >
                <span>No has iniciado sesión</span>
            </div>
        )

    return (
        <div
            className="profile-page fade-in"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                padding: "2rem 1rem",
            }}
        >
            <div
                className="card fade-in"
                style={{
                    background: "white",
                    padding: "3rem 2.5rem",
                    borderRadius: "16px",
                    minWidth: 320,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    maxWidth: 420,
                    width: "100%",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                }}
            >
                <h2
                    style={{
                        fontWeight: 700,
                        color: "#0f172a",
                        letterSpacing: "-0.5px",
                        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        marginBottom: 8,
                        fontSize: "1.875rem",
                        lineHeight: 1.2,
                    }}
                >
                    Bienvenido,
                </h2>
                <p
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#3b82f6",
                        marginBottom: 24,
                        wordBreak: "break-word",
                    }}
                >
                    {user.email}
                </p>
                <p
                    style={{
                        fontSize: 14,
                        marginBottom: 32,
                        color: "#64748b",
                        background: "#f8fafc",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                    }}
                >
                    <span style={{ fontWeight: 600, color: "#475569" }}>ID de Cliente:</span> {user.clientId}
                </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    }}
                >
                    <Link to="/my-books">
                        <button
                            className="btn-primary"
                            style={{
                                width: "100%",
                                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                color: "white",
                                padding: "14px 24px",
                                borderRadius: "10px",
                                border: "none",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
                            }}
                        >
                            Mis Libros
                        </button>
                    </Link>
                    <Link to="/my-exchanges/sent">
                        <button
                            className="btn-primary"
                            style={{
                                width: "100%",
                                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                color: "white",
                                padding: "14px 24px",
                                borderRadius: "10px",
                                border: "none",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
                            }}
                        >
                            Solicitudes Enviadas
                        </button>
                    </Link>
                    <Link to="/my-exchanges/received">
                        <button
                            className="btn-primary"
                            style={{
                                width: "100%",
                                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                color: "white",
                                padding: "14px 24px",
                                borderRadius: "10px",
                                border: "none",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
                            }}
                        >
                            Solicitudes Recibidas
                        </button>
                    </Link>
                    <button
                        className="btn-primary"
                        style={{
                            width: "100%",
                            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                            color: "white",
                            padding: "14px 24px",
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            marginTop: 12,
                            boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.3)",
                        }}
                        onClick={logout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    )
}
