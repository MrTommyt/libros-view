"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="header fade-in">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <h1
                            style={{
                                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                                fontWeight: 800,
                                color: "#6366f1",
                                fontSize: "1.85rem",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            📚 BiblioIntercambio
                        </h1>
                    </div>
                    <nav className="navigation">
                        <div className="nav-links">
                            <Link to="/AllBooks">Libros Disponibles</Link>
                            <Link to="/how-it-works">¿Cómo Funciona?</Link>
                            <Link to="/about">Acerca de</Link>
                        </div>
                        <div className="auth-buttons">
                            {!user ? (
                                <>
                                    <Link to="/login">
                                        <button className="btn-login">Iniciar Sesión</button>
                                    </Link>
                                    <Link to="/register">
                                        <button className="btn-register">Registrarse</button>
                                    </Link>
                                </>
                            ) : (
                                <div className="user-menu" style={{ position: "relative" }}>
                  <span
                      style={{
                          marginRight: 10,
                          fontWeight: 600,
                          color: "#6366f1",
                          fontSize: "0.95rem",
                      }}
                  >
                    ¡Hola, {user.email.split("@")[0]}!
                  </span>
                                    <div className="dropdown">
                                        <button
                                            className="btn-menu"
                                            onClick={() => setMenuOpen(!menuOpen)}
                                            type="button"
                                            style={{
                                                padding: "0.6rem 1.2rem",
                                                borderRadius: "8px",
                                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                                color: "#ffffff",
                                                border: "none",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
                                                transition: "all 0.2s ease",
                                            }}
                                        >
                                            Mi Cuenta ▼
                                        </button>
                                        <div
                                            className="dropdown-content"
                                            style={{
                                                display: menuOpen ? "block" : "none",
                                                animation: menuOpen ? "fadeIn 0.22s" : undefined,
                                                position: "absolute",
                                                top: "calc(100% + 8px)",
                                                right: 0,
                                                background: "#ffffff",
                                                borderRadius: "12px",
                                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                                                minWidth: "220px",
                                                padding: "0.5rem",
                                                zIndex: 1000,
                                                border: "1px solid #e2e8f0",
                                            }}
                                        >
                                            <Link
                                                to="/publish"
                                                onClick={() => setMenuOpen(false)}
                                                style={{
                                                    display: "block",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "8px",
                                                    transition: "background 0.2s ease",
                                                    textDecoration: "none", // removed underline from dropdown links
                                                    color: "#1e293b",
                                                }}
                                            >
                                                📖 Publicar Libro
                                            </Link>
                                            <Link
                                                to="/my-books"
                                                onClick={() => setMenuOpen(false)}
                                                style={{
                                                    display: "block",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "8px",
                                                    transition: "background 0.2s ease",
                                                    textDecoration: "none", // removed underline from dropdown links
                                                    color: "#1e293b",
                                                }}
                                            >
                                                📚 Mis Libros
                                            </Link>
                                            <Link
                                                to="/my-exchanges/sent"
                                                onClick={() => setMenuOpen(false)}
                                                style={{
                                                    display: "block",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "8px",
                                                    transition: "background 0.2s ease",
                                                    textDecoration: "none", // removed underline from dropdown links
                                                    color: "#1e293b",
                                                }}
                                            >
                                                📤 Solicitudes Enviadas
                                            </Link>
                                            <Link
                                                to="/my-exchanges/received"
                                                onClick={() => setMenuOpen(false)}
                                                style={{
                                                    display: "block",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "8px",
                                                    transition: "background 0.2s ease",
                                                    textDecoration: "none", // removed underline from dropdown links
                                                    color: "#1e293b",
                                                }}
                                            >
                                                📥 Solicitudes Recibidas
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout()
                                                    setMenuOpen(false)
                                                }}
                                                className="logout-btn"
                                                style={{
                                                    width: "100%",
                                                    textAlign: "left",
                                                    padding: "0.75rem 1rem",
                                                    borderRadius: "8px",
                                                    background: "transparent",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    color: "#ef4444",
                                                    fontWeight: 600,
                                                    transition: "background 0.2s ease",
                                                }}
                                            >
                                                🚪 Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
