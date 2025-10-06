import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { useAuth } from "../auth/AuthProvider"; // si quieres tomar el token del context

export default function MyExchanges() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    // const { token: ctxToken } = useAuth(); // opcional

    // arriba, antes del useEffect
    const { myId, myEmail } = useMemo(() => {
        try {
            const t = localStorage.getItem("auth-token") || localStorage.getItem("token");
            if (!t) return { myId: null, myEmail: null };
            const dec = jwtDecode(t);
            return {
                myId: dec?.UserId || dec?.userId || null, // por si cambia el nombre de la claim
                myEmail: dec?.sub || null,                 // <-- email del usuario logueado
            };
        } catch {
            return { myId: null, myEmail: null };
        }
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                const t =
                    // ctxToken ||
                    localStorage.getItem("auth-token") ||
                    localStorage.getItem("token");

                if (!t) {
                    setErr("No hay sesión. Inicia sesión.");
                    setLoading(false);
                    return;
                }

                const headers = { Authorization: `Bearer ${t}` };

                const [sent, received] = await Promise.all([
                    axios.get("http://localhost:8080/exchange/sent", { headers }),
                    axios.get("http://localhost:8080/exchange/received", { headers }),
                ]);

                const completed = [
                    ...(Array.isArray(sent.data) ? sent.data : []),
                    ...(Array.isArray(received.data) ? received.data : []),
                ].filter(r => r?.status === "COMPLETED");

                const normalized = completed.map(r => {
                    const iAmSender =
                        (myId && r?.fromUser?.id === myId) ||
                        (myEmail && r?.fromUser?.email === myEmail); // <-- fallback por email

                    const partner = iAmSender ? r?.toUser : r?.fromUser;

                    return {
                        id: r.id,
                        localDateTime: r.localDateTime,
                        myRole: iAmSender ? "Enviada" : "Recibida",
                        offeredTitle: r?.bookOffered?.bookDefinition?.title || "-",
                        requestedTitle: r?.bookRequested?.bookDefinition?.title || "-",
                        partnerName: partner?.name || partner?.email || "-", // ahora sí el otro
                    };
                });

                setRows(normalized);
            } catch (e) {
                setErr(
                    "No se pudieron cargar los intercambios: " +
                    (e?.response?.status || e.message)
                );
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [myId /*, ctxToken*/]);

    if (loading) return <div>Cargando intercambios...</div>;
    if (err) return <div style={{ color: "red" }}>Error: {err}</div>;

    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2>Mis intercambios completados ({rows.length})</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {rows.map(r => (
                    <li key={r.id} style={{border:"1px solid #ccc",borderRadius:8,margin:"16px 0",padding:16,background:"#181818",color:"#fff"}}>
                        <div><b>Tipo:</b> {r.myRole}</div>
                        <div><b>Con:</b> {r.partnerName}</div>
                        <div><b>Libro ofrecido:</b> {r.offeredTitle}</div>
                        <div><b>Libro recibido:</b> {r.requestedTitle}</div>
                        <div><b>Fecha:</b> {r.localDateTime ? new Date(r.localDateTime).toLocaleString() : "-"}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
