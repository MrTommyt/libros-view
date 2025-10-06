"use client"
import { useNavigate } from "react-router-dom"

const Hero = () => {
    const navigate = useNavigate()
    return (
        <section
            className="hero fade-in"
            style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            }}
        >
            <div className="container">
                <div className="hero-content fade-in">
                    <h2
                        style={{
                            fontFamily: "'Space Grotesk',sans-serif",
                            fontWeight: 700,
                            color: "#ffffff",
                            textShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                            marginBottom: "1.5rem",
                            fontSize: "2.75rem",
                            lineHeight: 1.2,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Intercambia Libros, Comparte Conocimiento
                    </h2>
                    <p
                        style={{
                            color: "#ffffff",
                            fontSize: "1.125rem",
                            letterSpacing: "0.01em",
                            fontWeight: 400,
                            maxWidth: 600,
                            margin: "0 auto 2.5rem",
                            lineHeight: 1.6,
                            textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Únete a nuestra comunidad de lectores. Publica tus libros y descubre nuevas historias intercambiando con
                        otros usuarios de manera gratuita.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-cta" onClick={() => navigate("/publish")}>
                            Publicar Mi Libro
                        </button>
                        <button className="btn-secondary" onClick={() => navigate("/AllBooks")}>
                            Explorar Libros
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
