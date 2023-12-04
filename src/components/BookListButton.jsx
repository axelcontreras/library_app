import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/src/styles/BookListButton.css';

const BookListButton = ({ api_url, userList, bookId }) => {
  const [bookLists, setBookLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define fetchData outside of useEffect and handleListButtonClick
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data

      if (!userList || !userList.listaid) {
        console.error('Error: No hay lista disponible.');
        return;
      }

      const response = await axios.get(`${api_url}/lists/${userList.listaid}/books`);
      setBookLists(response.data.libros);
    } catch (error) {
      console.error('Error al cargar los datos: ', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched (success or error)
    }
  };

  useEffect(() => {
    fetchData(); // Load initial data when the component mounts
  }, [api_url, userList]);

  const handleListButtonClick = async () => {
    try {
      if (!userList || !userList.listaid) {
        console.error('Error: No hay lista disponible.');
        return;
      }

      // Log the state before the API calls
      console.log('Before API Call - bookLists:', bookLists);

      const isBookInList = bookLists.some((bookList) => bookList.bookid === bookId);

      if (isBookInList) {
        // Book is already in the list, so remove it
        await axios.delete(`${api_url}/lists/${userList.listaid}/book/${bookId}`);
      } else {
        // Book is not in the list, so add it
        await axios.post(`${api_url}/lists/${userList.listaid}/book/${bookId}`);
      }

      // Log the response for debugging
      const response = await axios.get(`${api_url}/lists/${userList.listaid}/books`);
      console.log('After API Call - Updated Book List:', response.data.libros);

      // Reload the updated data after adding or removing the book.
      fetchData();
    } catch (error) {
      console.error('Error al manejar la lista: ', error);
      // Handle the error appropriately, such as showing a user-friendly message.
    }
  };

  return (
      <div key={userList.listaid} className="book-list-item"> 
        <span className="list-name">{userList.nombre}</span>
        {loading ? (
          <p>...</p>
        ) : (
          <button
            onClick={handleListButtonClick}
            className={`list-button ${bookLists.some((bookList) => bookList.bookid === bookId) ? 'remove' : 'add'}`}
          >
            {bookLists.some((bookList) => bookList.bookid === bookId)
              ? 'Eliminar de la lista'
              : 'Agregar a la lista'}
          </button>
        )}
      </div>
  );
};

export default BookListButton;
