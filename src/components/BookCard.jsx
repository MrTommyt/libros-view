import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "../styles/BookCard.css";

const BookCard = ({ book, showExchangeButton = false }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Solo muestra el botón si está habilitado y el usuario está logueado
    const canRequestExchange = showExchangeButton && user && book.clientId !== user.clientId;

    const handleExchangeClick = () => {
        navigate(`/exchange/confirm/${book.id}`);
    };

    return (
        <div className="book-card">
            {/* <img src={book.image} alt={book.title} className="book-image" /> */}
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">Por {book.author}</p>
                <p className="book-editorial">{book.editorial}</p>
                <p className="book-isbn">ISBN: {book.isbn}</p>
                <p className="book-condition">Estado: {book.state}</p>
                <div className="book-actions">
                    {canRequestExchange && (
                        <button className="btn-primary" onClick={handleExchangeClick}>
                            Solicitar Intercambio
                        </button>
                    )}
                    <button className="btn-details">Ver Detalles</button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
