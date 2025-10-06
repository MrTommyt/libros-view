const HowItWorks = () => {
    return (
        <section className="how-it-works fade-in" id="how-it-works">
            <div className="container">
                <h2
                    style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 800,
                        color: "#6366f1",
                        fontSize: "2.8rem",
                        marginBottom: "3.5rem",
                        letterSpacing: "-0.02em",
                        textAlign: "center",
                    }}
                >
                    ¿Cómo Funciona?
                </h2>
                <div className="steps-grid">
                    <div className="step fade-in" style={{ transitionDelay: ".1s" }}>
                        <div
                            className="step-number"
                            style={{
                                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.25), 0 2px 8px rgba(99, 102, 241, 0.15)",
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                color: "#ffffff",
                                width: "64px",
                                height: "64px",
                                borderRadius: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.75rem",
                                fontWeight: 800,
                                margin: "0 auto 1.5rem",
                            }}
                        >
                            1
                        </div>
                        <h3
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: 700,
                                color: "#1e293b",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Regístrate
                        </h3>
                        <p
                            style={{
                                color: "#64748b",
                                lineHeight: 1.6,
                                fontSize: "1rem",
                            }}
                        >
                            Crea tu cuenta gratuita y únete a nuestra comunidad de lectores
                        </p>
                    </div>
                    <div className="step fade-in" style={{ transitionDelay: ".2s" }}>
                        <div
                            className="step-number"
                            style={{
                                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.25), 0 2px 8px rgba(99, 102, 241, 0.15)",
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                color: "#ffffff",
                                width: "64px",
                                height: "64px",
                                borderRadius: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.75rem",
                                fontWeight: 800,
                                margin: "0 auto 1.5rem",
                            }}
                        >
                            2
                        </div>
                        <h3
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: 700,
                                color: "#1e293b",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Publica tus Libros
                        </h3>
                        <p
                            style={{
                                color: "#64748b",
                                lineHeight: 1.6,
                                fontSize: "1rem",
                            }}
                        >
                            Sube fotos y detalles de los libros que quieres intercambiar
                        </p>
                    </div>
                    <div className="step fade-in" style={{ transitionDelay: ".3s" }}>
                        <div
                            className="step-number"
                            style={{
                                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.25), 0 2px 8px rgba(99, 102, 241, 0.15)",
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                color: "#ffffff",
                                width: "64px",
                                height: "64px",
                                borderRadius: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.75rem",
                                fontWeight: 800,
                                margin: "0 auto 1.5rem",
                            }}
                        >
                            3
                        </div>
                        <h3
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: 700,
                                color: "#1e293b",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Explora y Solicita
                        </h3>
                        <p
                            style={{
                                color: "#64748b",
                                lineHeight: 1.6,
                                fontSize: "1rem",
                            }}
                        >
                            Busca libros que te interesen y solicita intercambios con otros usuarios
                        </p>
                    </div>
                    <div className="step fade-in" style={{ transitionDelay: ".4s" }}>
                        <div
                            className="step-number"
                            style={{
                                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.25), 0 2px 8px rgba(99, 102, 241, 0.15)",
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                color: "#ffffff",
                                width: "64px",
                                height: "64px",
                                borderRadius: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.75rem",
                                fontWeight: 800,
                                margin: "0 auto 1.5rem",
                            }}
                        >
                            4
                        </div>
                        <h3
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: 700,
                                color: "#1e293b",
                                marginBottom: "0.75rem",
                            }}
                        >
                            Intercambia
                        </h3>
                        <p
                            style={{
                                color: "#64748b",
                                lineHeight: 1.6,
                                fontSize: "1rem",
                            }}
                        >
                            Coordina con el propietario para realizar el intercambio
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
