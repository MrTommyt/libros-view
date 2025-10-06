import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error(await res.text());
            navigate("/login"); // Después del registro, va al login
        } catch (e) {
            setErr(e.message || "Error en el registro");
        }
    };

    return (
        <div className="register-page">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
                <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" required />
                <input name="address" placeholder="Dirección" value={form.address} onChange={handleChange} required />
                <input name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} type="password" required />
                <button type="submit">Crear cuenta</button>
                {err && <div className="alert">{err}</div>}
            </form>
        </div>
    );
}
