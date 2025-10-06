"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", address: "" })
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleRegister = async (e) => {
        e.preventDefault()
        setErr("")
        setLoading(true)
        try {
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error(await res.text())
            navigate("/login")
        } catch (e) {
            setErr(e.message || "Error en el registro")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="register-page fade-in"
            style={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                padding: "2rem 1rem",
            }}
        >
            <form
                className="card"
                onSubmit={handleRegister}
                style={{
                    padding: "3rem 2.5rem",
                    minWidth: 340,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderRadius: "16px",
                    background: "white",
                    width: "100%",
                    maxWidth: 420,
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                }}
            >
                <h2
                    style={{
                        marginBottom: "2rem",
                        fontWeight: 700,
                        color: "#0f172a",
                        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        letterSpacing: "-0.5px",
                        fontSize: "1.875rem",
                    }}
                >
                    Registro
                </h2>
                <input
                    className="fade-in"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "14px 16px",
                        marginBottom: "1rem",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "15px",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc",
                    }}
                />
                <input
                    className="fade-in"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    required
                    style={{
                        width: "100%",
                        padding: "14px 16px",
                        marginBottom: "1rem",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "15px",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc",
                    }}
                />
                <input
                    className="fade-in"
                    name="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "14px 16px",
                        marginBottom: "1rem",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "15px",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc",
                    }}
                />
                <input
                    className="fade-in"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    required
                    style={{
                        width: "100%",
                        padding: "14px 16px",
                        marginBottom: "1.5rem",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "15px",
                        transition: "all 0.2s ease",
                        outline: "none",
                        background: "#f8fafc",
                    }}
                />

                <button
                    type="submit"
                    className="btn-register fade-in"
                    style={{
                        width: "100%",
                        marginBottom: 10,
                        background: loading ? "#94a3b8" : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        color: "white",
                        padding: "14px 24px",
                        borderRadius: "10px",
                        border: "none",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: loading ? "none" : "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "48px",
                    }}
                    disabled={loading}
                >
                    {loading ? <span className="spinner" /> : "Crear cuenta"}
                </button>

                {err && (
                    <div
                        className="alert fade-in"
                        style={{
                            background: "#fee2e2",
                            color: "#dc2626",
                            borderRadius: 10,
                            padding: "12px 16px",
                            margin: "12px 0 0 0",
                            fontSize: 14,
                            textAlign: "center",
                            border: "1px solid #fecaca",
                            fontWeight: 500,
                        }}
                    >
                        {err}
                    </div>
                )}
            </form>
        </div>
    )
}
