import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import "../styles/PublishBook.css";

export default function PublishBook({ titlesBase = "http://localhost:8080/api/v1/titles", booksBase = "http://localhost:8080/api/v1/books" }) {
    const { user, token } = useAuth(); // Obtener user y token del contexto
    const [defs, setDefs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [stateText, setStateText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // ---------------------- Fetch book_definition ----------------------
    useEffect(() => {
        let ignore = false;
        const run = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`${titlesBase}`, { headers: { Accept: "application/json" } });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!ignore) setDefs(Array.isArray(data) ? data : data.items ?? []);
            } catch (e) {
                if (!ignore) setError("No fue posible cargar los libros guardados (book_definition).");
                console.error(e);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        run();
        return () => { ignore = true; };
    }, [titlesBase]);

    // ---------------------- Filter/search ----------------------
    const filtered = useMemo(() => {
        if (!query.trim()) return defs;
        const q = query.toLowerCase();
        return defs.filter((d) => {
            const title = (d.title ?? "").toLowerCase();
            const author = (d.author ?? "").toLowerCase();
            const editorial = (d.editorial ?? "").toLowerCase();
            const isbn = (d.isbn ?? "").toLowerCase();
            return title.includes(q) || author.includes(q) || editorial.includes(q) || isbn.includes(q);
        });
    }, [defs, query]);

    // ---------------------- Submit ----------------------
    const canSubmit = selectedId && stateText.trim() && !submitting && user;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        setSuccessMsg("");
        setError("");

        try {
            const payload = {
                state: stateText.trim(),
                bookDefinitionID: String(selectedId),
                clientId: String(user.clientId), // Usar clientId del contexto
            };

            const res = await fetch(`${booksBase}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}` // Incluir token para autenticación
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const body = await res.text();
                throw new Error(`HTTP ${res.status} - ${body}`);
            }

            setSuccessMsg("¡Libro publicado correctamente!");
            setSelectedId("");
            setStateText("");
        } catch (e) {
            console.error(e);
            setError("No se pudo publicar el libro. Revisa el backend o los datos enviados.");
        } finally {
            setSubmitting(false);
        }
    };

    // Si no hay usuario, mostrar mensaje
    if (!user) {
        return <div className="publish-page">Debes iniciar sesión para publicar libros.</div>;
    }

    // ---------------------- UI ----------------------
    return (
        <div className="publish-page">
            <h1 className="page-title">Publicar libro</h1>

            <div className="card">
                <form onSubmit={onSubmit} className="form-grid">
                    {/* Buscador */}
                    <div className="field">
                        <label className="label">Buscar en libros guardados (book_definition)</label>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Filtra por título, autor, editorial o ISBN"
                            className="input"
                        />
                    </div>

                    {/* Selector */}
                    <div className="field">
                        <label className="label">Selecciona el libro</label>
                        <select
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                            className="select"
                            disabled={loading || !filtered.length}
                        >
                            <option value="" disabled>
                                {loading ? "Cargando…" : filtered.length ? "Elige una opción" : "No hay resultados"}
                            </option>
                            {filtered.map((d) => {
                                const id = d.id ?? d.idBookDefinition ?? d.id_book_definition;
                                return (
                                    <option key={id} value={id}>
                                        {(d.title ?? "Sin título")} — {(d.author ?? "Autor desconocido")}
                                        {d.isbn ? ` (${d.isbn})` : ""}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="helper">Fuente: tabla <code>book_definition</code> en PostgreSQL</div>
                    </div>

                    {/* Estado */}
                    <div className="field">
                        <label className="label">Estado</label>
                        <input
                            type="text"
                            value={stateText}
                            onChange={(e) => setStateText(e.target.value)}
                            placeholder="Ej: disponible, usado como nuevo, buen estado, con subrayados, etc."
                            className="input"
                            maxLength={120}
                        />
                    </div>

                    {/* Mensajes */}
                    {error && <div className="alert alert-error">{error}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}

                    {/* Acciones */}
                    <div className="actions">
                        <button type="submit" disabled={!canSubmit} className="btn btn-primary">
                            {submitting ? "Publicando…" : "Publicar"}
                        </button>
                        <button type="button" onClick={() => { setSelectedId(""); setStateText(""); }} className="btn btn-ghost">
                            Limpiar
                        </button>
                        <span className="helper">
              Se creará un registro en <code>book</code> asociado a <code>bookDefinition</code>
                            {user ? ` y al cliente ${user.email}` : ""} con el <code>state</code> indicado.
            </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
