import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "María Camila Mercado",
    email: "camila@example.com",
    address: "Calle 123 #45-67, Bogotá",
  });

  const [userBooks, setUserBooks] = useState([]);
  const [exchangedBooks, setExchangedBooks] = useState([]);
  const [exchangeRequests, setExchangeRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Libros publicados
    const mockPublishedBooks = [
      { id: 1, title: "El Principito", author: "Antoine de Saint-Exupéry" },
      {
        id: 2,
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
      },
      { id: 3, title: "Rayuela", author: "Julio Cortázar" },
    ];

    // Libros intercambiados
    const mockExchangedBooks = [
      { id: 1, title: "1984", author: "George Orwell" },
      {
        id: 2,
        title: "Don Quijote de la Mancha",
        author: "Miguel de Cervantes",
      },
    ];

    // Solicitudes de intercambio
    const mockExchangeRequests = [
      { id: 1, requester: "Andrés Pérez", book: "La Odisea" },
      {
        id: 2,
        requester: "Laura Gómez",
        book: "Crónica de una muerte anunciada",
      },
    ];

    setUserBooks(mockPublishedBooks);
    setExchangedBooks(mockExchangedBooks);
    setExchangeRequests(mockExchangeRequests);
  }, []);

  const handleAccept = (id) => {
    alert(`Intercambio aceptado para la solicitud #${id}`);
    setExchangeRequests(exchangeRequests.filter((req) => req.id !== id));
  };

  const handleReject = (id) => {
    alert(`Solicitud #${id} descartada`);
    setExchangeRequests(exchangeRequests.filter((req) => req.id !== id));
  };

  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>

      {/* Información del usuario */}
      <section className="profile-info">
        <h3>Información Personal</h3>
        <p>
          <strong>Nombre:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Correo:</strong> {userInfo.email}
        </p>
        <p>
          <strong>Dirección:</strong> {userInfo.address}
        </p>
      </section>

      {/* Libros publicados */}
      <section className="profile-section">
        <h3>Libros Publicados</h3>
        <div className="books-grid">
          {userBooks.length > 0 ? (
            userBooks.map((book) => (
              <div key={book.id} className="book-card">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            ))
          ) : (
            <p>No has publicado ningún libro aún.</p>
          )}
        </div>
      </section>

      {/* Libros intercambiados */}
      <section className="profile-section exchanged">
        <h3>Libros Intercambiados</h3>
        <div className="books-grid">
          {exchangedBooks.length > 0 ? (
            exchangedBooks.map((book) => (
              <div key={book.id} className="book-card exchanged">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            ))
          ) : (
            <p>No has realizado intercambios todavía.</p>
          )}
        </div>
      </section>

      {/* Solicitudes de intercambio */}
      <section className="profile-section requests">
        <h3>Solicitudes de Intercambio</h3>
        {exchangeRequests.length > 0 ? (
          <div className="requests-list">
            {exchangeRequests.map((req) => (
              <div key={req.id} className="request-card">
                <p>
                  <strong>Usuario:</strong> {req.requester}
                </p>
                <p>
                  <strong>Libro Solicitado:</strong> {req.book}
                </p>
                <div className="request-buttons">
                  <button
                    className="btn-accept"
                    onClick={() => handleAccept(req.id)}
                  >
                    Aceptar
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(req.id)}
                  >
                    Descartar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes solicitudes pendientes.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
