import React, { useState } from "react";
import "../styles/Book.css";
import UserSignIn from "../services/UserSignIn";

const LoginForm = ({ onSwitch, onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [ok, setOk] = useState("");
    const auth = new UserSignIn();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(""); setOk("");

        if (!email || !password) {
            setErr("Email y contraseña son obligatorios.");
            return;
        }

        try {
            const { token, userId } = await auth.login(email, password);
            setOk("Inicio de sesión exitoso.");
            if (onLogin) onLogin({ token, userId });
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.description ||
                "Credenciales inválidas o error del servidor.";
            setErr(msg);
        }
    };

    return (
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
                {err && <p className="error-message">{err}</p>}
                {ok && <p className="success-message">{ok}</p>}
                <button type="submit">¡Vamos!</button>
            </form>
            <p>
                ¿Aún no tienes una cuenta?{" "}
                <span className="link" onClick={onSwitch}>Regístrate</span>
            </p>
        </div>
    );
};

export default LoginForm;
