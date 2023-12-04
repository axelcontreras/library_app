import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookListButton from './BookListButton';
import '/src/styles/BookCard.css';



const BookCard = ({ bookId, api_url, onClose }) => {
  const [book, setBook] = useState({ titulo: '', descripcion: '', autor: '' });
  const [user, setUser] = useState({});
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await axios.get(`${api_url}/books/${bookId}`, { withCredentials: true });
        const bookData = bookResponse.data.libro || {};
        setBook(bookData);

        const userResponse = await axios.get(`${api_url}/user`, { withCredentials: true });
        const userData = userResponse.data.usuario[0] || {};
        setUser(userData);

        const listsResponse = await axios.get(`${api_url}/profile/${userData.id}/lists`, { withCredentials: true });
        const listsData = listsResponse.data.listas || [];
        setUserLists(listsData);
        
      } catch (error) {
        console.error('Error obteniendo datos del libro, usuario o listas: ', error);
        // Podrías manejar el error de manera más adecuada, como mostrar un mensaje al usuario.
      }
    };

    fetchData();
  }, [api_url, bookId, user.id]);

  return (
    <div className="book-card-container">
      <div className="book-card-modal">
        <div className="left-content">
          <h2>{book.titulo}</h2>
          <p>{book.descripcion}</p>
          <p>Autor: {book.autor}</p>
          
        </div>
        <div 
        className="right-content" 
        style={{'&::WebkitScrollbar': { width: 0, }}}
        >
        {userLists.map((list) => (
          <BookListButton
            key={list.listaid}
            api_url={api_url}
            userList={{ listaid: list.listaid, nombre: list.nombre }}
            bookId={bookId}
          />
        ))}
        </div>
        
      </div>
      <div className="div-close-button">
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );  
};

export default BookCard;
