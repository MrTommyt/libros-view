import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <h1>📚 BiblioIntercambio</h1>
                    </div>
                    <nav className="navigation">
                        <div className="nav-links">
                            <Link to="/AllBooks">Libros Disponibles</Link>

                            * <Link to="/how-it-works">¿Cómo Funciona?</Link>
                            <Link to="/about">Acerca de</Link> */
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
                                <div className="user-menu">
                                    <span style={{ marginRight: 8 }}>¡Hola, {user.email}!</span>
                                    <div className="dropdown">
                                        <button
                                            className="btn-menu"
                                            onClick={() => setMenuOpen(!menuOpen)}
                                        >
                                            Mi Cuenta ▼
                                        </button>
                                        {menuOpen && (
                                            <div className="dropdown-content">
                                                <Link to="/publish" onClick={() => setMenuOpen(false)}>
                                                    📖 Publicar Libro
                                                </Link>
                                                <Link to="/my-books" onClick={() => setMenuOpen(false)}>
                                                    📚 Mis Libros
                                                </Link>
                                                <Link to="/my-exchanges/sent" onClick={() => setMenuOpen(false)}>
                                                    📤 Solicitudes Enviadas
                                                </Link>
                                                <Link to="/my-exchanges/received" onClick={() => setMenuOpen(false)}>
                                                    📥 Solicitudes Recibidas
                                                </Link>
                                                <Link to="/my-exchanges" onClick={() => setMenuOpen(false)}>
                                                    🔄 Mis Intercambios
                                                </Link>
                                                <button
                                                    onClick={() => { logout(); setMenuOpen(false); }}
                                                    className="logout-btn"
                                                >
                                                    🚪 Cerrar Sesión
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
