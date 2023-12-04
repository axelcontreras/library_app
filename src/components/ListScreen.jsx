// ListScreen.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import '/src/styles/ListScreen.css';


const ListScreen = ({ api_url }) => {
  
  const { id } = useParams();
  const [list, setList] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listResponse = await axios.get(`${api_url}/lists/${id}`, { withCredentials: true });
        const listData = listResponse.data.lista;
        setList(listData);
  
        const booksResponse = await axios.get(`${api_url}/lists/${id}/books`, { withCredentials: true });
        const booksData = booksResponse.data.libros;
        setBooks(booksData);
        console.log(booksData);

        setLoading(false); // Marcar como no cargando después de obtener los datos
      } catch (error) {
        console.error('Error obteniendo lista: ', error);
        setLoading(false); // Marcar como no cargando en caso de error
      }
    };

    fetchData();
  }, [api_url, id]);

  const onDeleteBook = async (bookid) => {
    try {
      const response = await axios.delete(`${api_url}/lists/${id}/books/${bookid}`, { withCredentials: true });
      console.log('Respuesta de eliminación de libro:', response);
  
      if (response.status === 200) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.bookid !== bookid));
        console.log('Libro eliminado con éxito.');
      } else {
        console.error('Error al eliminar el libro. Estado de la respuesta:', response.status);
      }
    } catch (error) {
      console.error('Error eliminando libro:', error);
    }
  }; 

  const onCleanList = async () => {
    try {
      const response = await axios.delete(`${api_url}/lists/${id}/books`, { withCredentials: true });
      console.log('Respuesta de limpieza de lista:', response);
  
      if (response.status === 200) {
        setBooks([]);
        console.log('Lista limpiada con éxito.');
      } else {
        console.error('Error al limpiar la lista. Estado de la respuesta:', response.status);
      }
    } catch (error) {
      console.error('Error limpiando lista:', error);
    }
  } 

  const navigate = useNavigate();

  const onDeleteList = async () => {
    try {
      const response = await axios.delete(`${api_url}/lists/${id}`, { withCredentials: true });
      console.log('Respuesta de eliminación de lista:', response);

      if (response.status === 200) {
        console.log('Lista eliminada con éxito.');
        // Utiliza useNavigate para redirigir a la página "/perfil"
        navigate('/perfil');
      } else {
        console.error('Error al eliminar la lista. Estado de la respuesta:', response.status);
      }
    } catch (error) {
      console.error('Error eliminando lista:', error);
    }
  };

  const paragraph = <p className="loading-paragraph">Cargando...</p>;

  return (
    <div className="list-screen-container">
      <button className="back-button" onClick={() => navigate('/perfil')}>Volver</button>
      <h1 className="list-title">Lista: {list.nombre}</h1>
      {loading ? (
        paragraph
      ) : (
        <>
          {books && books.length > 0 ? (
            <table className="books-table">
              <thead className="books-table-head">
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.bookid}>
                    <td>{book.titulo}</td>
                    <td>{book.autor}</td>
                    <td>{book.descripcion}</td>
                    <td>
                      <button className="delete-book-button" onClick={() => onDeleteBook(book.bookid)}>Eliminar Libro</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-books-paragraph">No hay libros en esta lista.</p>
          )}
          <button className="clean-list-button" onClick={() => onCleanList()}>Limpiar Lista</button>
          <button className="delete-list-button" onClick={() => onDeleteList()}>Eliminar Lista</button>
        </>
      )}
    </div>
  );    
};

export default ListScreen;
