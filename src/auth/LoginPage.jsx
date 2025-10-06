import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) throw new Error("Credenciales incorrectas");
            const data = await res.json();
            login(data.token);
            navigate("/"); // Redirige al home, no al profile
        } catch (e) {
            setErr(e.message || "Error desconocido");
        }
    };

    return (
        <div className="login-page">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
                <input placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
                <button type="submit">Entrar</button>
                {err && <div className="alert">{err}</div>}
            </form>
        </div>
    );
}
