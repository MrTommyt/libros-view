import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

export default function Profile() {
    const { user, logout } = useAuth();
    if (!user) return <div>No logueado</div>;

    return (
        <div className="profile-page">
            <h2>Bienvenido, {user.email}</h2>
            <p>ID: {user.clientId}</p>
            <div>
                <Link to="/my-books"><button>Mis Libros</button></Link>
                <Link to="/my-exchanges/sent"><button>Solicitudes Enviadas</button></Link>
                <Link to="/my-exchanges/received"><button>Solicitudes Recibidas</button></Link>
                <button onClick={logout}>Cerrar sesión</button>
            </div>
        </div>
    );
}
