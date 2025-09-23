import React from 'react';
import BookCard from './BookCard.jsx';
import { availableBooks } from '../data/books.js';

const BooksSection = () => {
  return (
    <section className="books-section" id="books">
      <div className="container">
        <div className="section-header">
          <h2>Libros Disponibles para Intercambio</h2>
          <p>Descubre la variedad de libros que nuestra comunidad tiene para ofrecer</p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Buscar por título, autor o género..." 
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="filter-options">
            <select className="filter-select">
              <option>Todos los géneros</option>
              <option>Ficción</option>
              <option>No ficción</option>
              <option>Clásicos</option>
              <option>Ciencia ficción</option>
              <option>Romance</option>
            </select>
            <select className="filter-select">
              <option>Todas las condiciones</option>
              <option>Como nuevo</option>
              <option>Excelente</option>
              <option>Bueno</option>
              <option>Regular</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          {availableBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;