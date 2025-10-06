import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function MyReceivedExchanges() {
    const { token } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8080/exchange/received", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(data => setRequests(Array.isArray(data) ? data : []))
                .catch(e => setError("No se pudieron cargar tus solicitudes recibidas: " + e.message))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleStatus = async (id, status) => {
        try {
            await fetch(`http://localhost:8080/exchange/${id}/status?status=${status}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });
            setRequests(prev => prev.filter(req => req.id !== id));
        } catch (e) {
            alert("Error al actualizar estado: " + e.message);
        }
    };

    if (loading) return <div>Cargando solicitudes recibidas...</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

    // FILTRO SOLO LAS PENDING ANTES DE RENDERIZAR
    const pendingRequests = requests.filter(req => req.status === "PENDING");

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2>Solicitudes recibidas ({pendingRequests.length})</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {pendingRequests.map(req => (
                    <li
                        key={req.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            margin: "16px 0",
                            padding: "16px",
                            background: "#181818",
                            color: "#fff"
                        }}
                    >
                        {req.fromUser?.name} te ofreció <b>{req.bookOffered?.bookDefinition?.title}</b>
                        por tu libro <b>{req.bookRequested?.bookDefinition?.title}</b>
                        <div style={{ marginTop: 10 }}>
                            <button
                                onClick={() => handleStatus(req.id, "COMPLETED")}
                                style={{ marginRight: 8 }}
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={() => handleStatus(req.id, "REJECTED")}
                            >
                                Rechazar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
