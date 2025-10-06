"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "../auth/AuthProvider"

export default function PublishBook({
                                        titlesBase = "http://localhost:8080/api/v1/titles",
                                        booksBase = "http://localhost:8080/api/v1/books",
                                    }) {
    const { user, token } = useAuth()
    const [defs, setDefs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [query, setQuery] = useState("")
    const [selectedId, setSelectedId] = useState("")
    const [stateText, setStateText] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")

    useEffect(() => {
        let ignore = false
        const run = async () => {
            setLoading(true)
            setError("")
            try {
                const res = await fetch(`${titlesBase}`, { headers: { Accept: "application/json" } })
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                if (!ignore) setDefs(Array.isArray(data) ? data : (data.items ?? []))
            } catch (e) {
                if (!ignore) setError("No fue posible cargar los libros guardados (book_definition).")
            } finally {
                if (!ignore) setLoading(false)
            }
        }

        run()
        return () => {
            ignore = true
        }
    }, [titlesBase])

    const filtered = useMemo(() => {
        if (!query.trim()) return defs
        const q = query.toLowerCase()
        return defs.filter((d) => {
            const title = (d.title ?? "").toLowerCase()
            const author = (d.author ?? "").toLowerCase()
            const editorial = (d.editorial ?? "").toLowerCase()
            const isbn = (d.isbn ?? "").toLowerCase()
            return title.includes(q) || author.includes(q) || editorial.includes(q) || isbn.includes(q)
        })
    }, [defs, query])

    const canSubmit = selectedId && stateText.trim() && !submitting && user

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!canSubmit) return
        setSubmitting(true)
        setSuccessMsg("")
        setError("")

        try {
            const payload = {
                state: stateText.trim(),
                bookDefinitionID: String(selectedId),
                clientId: String(user.clientId),
            }

            const res = await fetch(`${booksBase}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const body = await res.text()
                throw new Error(`HTTP ${res.status} - ${body}`)
            }

            setSuccessMsg("¡Libro publicado correctamente!")
            setSelectedId("")
            setStateText("")
        } catch (e) {
            setError("No se pudo publicar el libro. Revisa el backend o los datos enviados.")
        } finally {
            setSubmitting(false)
        }
    }

    if (!user) {
        return (
            <div
                className="publish-page fade-in"
                style={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ef4444",
                    fontSize: 18,
                    fontWeight: 600,
                }}
            >
                Debes iniciar sesión para publicar libros.
            </div>
        )
    }

    return (
        <div
            className="publish-page fade-in"
            style={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                padding: "2rem 1rem",
            }}
        >
            <div
                className="card fade-in"
                style={{
                    maxWidth: 520,
                    width: "100%",
                    borderRadius: "16px",
                    background: "#ffffff",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                    padding: "2.5rem 2.5rem",
                    margin: "2rem 0",
                    border: "1px solid rgba(99, 102, 241, 0.1)",
                }}
            >
                <h1
                    className="page-title"
                    style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 800,
                        color: "#6366f1",
                        fontSize: "2.2rem",
                        marginBottom: 24,
                        letterSpacing: "-0.02em",
                    }}
                >
                    Publicar libro
                </h1>
                <form onSubmit={onSubmit} className="form-grid fade-in">
                    <div className="field" style={{ marginBottom: 16 }}>
                        <label
                            className="label"
                            style={{
                                fontWeight: 600,
                                marginBottom: 8,
                                display: "block",
                                color: "#334155",
                                fontSize: "0.95rem",
                            }}
                        >
                            Buscar en libros guardados
                        </label>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Filtra por título, autor, editorial o ISBN"
                            className="input"
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                border: "2px solid #e2e8f0",
                                fontSize: "0.95rem",
                                transition: "all 0.2s ease",
                            }}
                        />
                    </div>

                    <div className="field" style={{ marginBottom: 16 }}>
                        <label
                            className="label"
                            style={{
                                fontWeight: 600,
                                marginBottom: 8,
                                display: "block",
                                color: "#334155",
                                fontSize: "0.95rem",
                            }}
                        >
                            Selecciona el libro
                        </label>
                        <select
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                            className="select"
                            disabled={loading || !filtered.length}
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                border: "2px solid #e2e8f0",
                                fontSize: "0.95rem",
                                background: "#ffffff",
                                cursor: "pointer",
                            }}
                        >
                            <option value="" disabled>
                                {loading ? "Cargando…" : filtered.length ? "Elige una opción" : "No hay resultados"}
                            </option>
                            {filtered.map((d) => {
                                const id = d.id ?? d.idBookDefinition ?? d.id_book_definition
                                return (
                                    <option key={id} value={id}>
                                        {d.title ?? "Sin título"} — {d.author ?? "Autor desconocido"}
                                        {d.isbn ? ` (${d.isbn})` : ""}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="field" style={{ marginBottom: 16 }}>
                        <label
                            className="label"
                            style={{
                                fontWeight: 600,
                                marginBottom: 8,
                                display: "block",
                                color: "#334155",
                                fontSize: "0.95rem",
                            }}
                        >
                            Estado
                        </label>
                        <input
                            type="text"
                            value={stateText}
                            onChange={(e) => setStateText(e.target.value)}
                            placeholder="Ej: disponible, usado como nuevo, buen estado..."
                            className="input"
                            maxLength={120}
                            style={{
                                width: "100%",
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                border: "2px solid #e2e8f0",
                                fontSize: "0.95rem",
                            }}
                        />
                    </div>

                    {error && (
                        <div
                            className="alert fade-in"
                            style={{
                                background: "#fee2e2",
                                color: "#dc2626",
                                borderRadius: 10,
                                padding: "12px 1rem",
                                margin: "12px 0 0 0",
                                fontSize: 14,
                                textAlign: "center",
                                fontWeight: 500,
                                border: "1px solid #fecaca",
                            }}
                        >
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div
                            className="alert fade-in"
                            style={{
                                background: "#d1fae5",
                                color: "#059669",
                                borderRadius: 10,
                                padding: "12px 1rem",
                                margin: "12px 0 0 0",
                                fontSize: 14,
                                textAlign: "center",
                                fontWeight: 500,
                                border: "1px solid #a7f3d0",
                            }}
                        >
                            {successMsg}
                        </div>
                    )}

                    <div
                        className="actions"
                        style={{
                            marginTop: 20,
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="btn-primary"
                            style={{
                                flex: 1,
                                padding: "0.85rem 1.5rem",
                                borderRadius: "10px",
                                background: canSubmit ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" : "#cbd5e1",
                                color: "#ffffff",
                                border: "none",
                                fontWeight: 600,
                                fontSize: "1rem",
                                cursor: canSubmit ? "pointer" : "not-allowed",
                                boxShadow: canSubmit ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {submitting ? "Publicando…" : "Publicar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedId("")
                                setStateText("")
                            }}
                            className="btn-secondary"
                            style={{
                                flex: 1,
                                padding: "0.85rem 1.5rem",
                                borderRadius: "10px",
                                background: "#f1f5f9",
                                color: "#475569",
                                border: "2px solid #e2e8f0",
                                fontWeight: 600,
                                fontSize: "1rem",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            disabled={submitting}
                        >
                            Limpiar
                        </button>
                    </div>
                    <span
                        className="helper"
                        style={{
                            display: "block",
                            marginTop: 16,
                            color: "#64748b",
                            fontSize: 13,
                            lineHeight: 1.5,
                        }}
                    >
            Se creará un registro en{" "}
                        <code
                            style={{
                                background: "#f1f5f9",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontFamily: "monospace",
                            }}
                        >
              book
            </code>{" "}
                        asociado a{" "}
                        <code
                            style={{
                                background: "#f1f5f9",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontFamily: "monospace",
                            }}
                        >
              bookDefinition
            </code>
                        {user ? ` y al cliente ${user.email}` : ""} con el{" "}
                        <code
                            style={{
                                background: "#f1f5f9",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontFamily: "monospace",
                            }}
                        >
              state
            </code>{" "}
                        indicado.
          </span>
                </form>
            </div>
        </div>
    )
}
