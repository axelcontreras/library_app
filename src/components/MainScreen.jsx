import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import '/src/styles/MainScreen.css';

const MainScreen = ({ api_url }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorAddingBook, setErrorAddingBook] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener userId desde el backend
        const userIdResponse = await axios.get(`${api_url}/user`, { withCredentials: true });
        const userIdData = userIdResponse.data.usuario[0].id || null;  // Ajusta el índice [0] según la estructura real
        setUserId(userIdData);
  
        // Obtener lista de libros después de obtener userId
        const booksResponse = await axios.get(`${api_url}/books`, { withCredentials: true });
        const booksData = booksResponse.data.libros || [];
        setBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo datos: ', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [api_url]);

  const onBookButtonClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  const paragraph = <p>Cargando...</p>;

  return (
    <div className='ms-books-body'>
      <h1 className='ms-books-title'>Lista de Libros</h1>
      {loading ? (
        paragraph
      ) : (
        <div className="book-cards-container">
          {errorAddingBook && <p style={{ color: 'red' }}>{errorAddingBook}</p>}
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h2 className='ms-books-subtitle'>{book.titulo}</h2>
              <button onClick={() => onBookButtonClick(book.id)}>Ver</button>
            </div>
          ))}
        </div>
      )}
      {selectedBookId && (
        <BookCard
          bookId={selectedBookId}
          api_url={api_url}
          userId={userId}
          onClose={() => setSelectedBookId(null)}
        />
      )}
    </div>
  );
};

export default MainScreen;
