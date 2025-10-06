const Footer = () => {
    return (
        <footer className="footer fade-in">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3
                            style={{
                                color: "#8b5cf6",
                                marginBottom: 8,
                                fontWeight: 800,
                                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                                fontSize: "1.55rem",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            📚 BiblioIntercambio
                        </h3>
                        <p
                            style={{
                                color: "#d8b4fe",
                                fontWeight: 500,
                                fontSize: 15,
                                lineHeight: 1.5,
                                maxWidth: "280px",
                            }}
                        >
                            La plataforma que conecta lectores y facilita el intercambio de libros
                        </p>
                    </div>
                    <div className="footer-section">
                        <h4
                            style={{
                                color: "#a78bfa",
                                fontWeight: 700,
                                marginBottom: 16,
                                fontSize: "1.05rem",
                            }}
                        >
                            Enlaces
                        </h4>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#books"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    Libros Disponibles
                                </a>
                            </li>
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#how-it-works"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    ¿Cómo Funciona?
                                </a>
                            </li>
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#about"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    Acerca de
                                </a>
                            </li>
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#contact"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4
                            style={{
                                color: "#a78bfa",
                                fontWeight: 700,
                                marginBottom: 16,
                                fontSize: "1.05rem",
                            }}
                        >
                            Soporte
                        </h4>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#help"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    Centro de Ayuda
                                </a>
                            </li>
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#faq"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    Preguntas Frecuentes
                                </a>
                            </li>
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#terms"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    Términos de Uso
                                </a>
                            </li>
                            <li style={{ marginBottom: "0.5rem" }}>
                                <a
                                    href="#privacy"
                                    style={{
                                        color: "#e9d5ff",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    Política de Privacidad
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    className="footer-bottom"
                    style={{
                        fontSize: 14,
                        marginTop: "2.5rem",
                        paddingTop: "1.5rem",
                        borderTop: "1px solid rgba(167, 139, 250, 0.2)",
                        textAlign: "center",
                    }}
                >
                    <p
                        style={{
                            color: "#d8b4fe",
                            margin: 0,
                        }}
                    >
                        &copy; 2025{" "}
                        <span
                            style={{
                                color: "#a78bfa",
                                fontWeight: 700,
                            }}
                        >
              BiblioIntercambio
            </span>
                        . Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
