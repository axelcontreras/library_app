// UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/src/styles/UserProfile.css';


const UserProfile = ({ api_url }) => {
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api_url}/user`, { withCredentials: true });
        const userData = response.data.usuario[0];
        setUser(userData);

        const listsResponse = await axios.get(`${api_url}/profile/${userData.id}/lists`);
        const listsData = listsResponse.data.listas;
        setLists(listsData);

        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo usuario: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [api_url]);

  const handleCreateList = async () => {
    try {
      const currentUser = user.id;
      const response = await axios.post(
        `${api_url}/lists`,
        { nombre: newListName, user: currentUser },
        { withCredentials: true }
      );
  
      console.log('Respuesta de crear lista:', response);
  
      const newList = response.data; // Ajusta según la estructura correcta
  
      if (!newList || typeof newList !== 'object') {
        console.error('La respuesta no tiene una propiedad "lista" válida.');
        return;
      }
  
      setLists(prevLists => {
        const updatedLists = [...prevLists, newList];
        console.log('Listas después de la actualización:', updatedLists);
        return updatedLists;
      });
  
      setNewListName('');
      setShowCreateListForm(false);
    } catch (error) {
      console.error('Error creando lista:', error);
    }
  };
  
  const handleDeleteList = async (listId) => {
    try {
      const response = await axios.delete(`${api_url}/lists/${listId}`,
       { withCredentials: true }
      );

      if (response.status === 200) {
        setLists((prevLists) => prevLists.filter((list) => list.listaid !== listId));
        console.log('Lista eliminada con éxito.');
      } else {
        console.error('Error al eliminar la lista.');
      }
    } catch (error) {
      console.error('Error al eliminar la lista:', error);
    }
  };

  const paragraph = <p className="loading-paragraph">Cargando...</p>;

  return (
    <div className="user-profile-container">
      <h1 className="profile-title">Perfil de Usuario</h1>
      {loading ? (
        paragraph
      ) : (
        <>
          <p className="profile-text">Nombre de usuario: {user.username}</p>
          <h2 >Listas:</h2>
          <ul className="lists-ul">
            {lists.map((list) => (
              <li key={`${list.listaid}_${list.nombre}`} className="list-item">
                <Link to={`/perfil/lista/${list.listaid}`}>
                  <button className="view-list-button">{list.nombre}</button>
                </Link>
                <span>
                <Link to={`/perfil/lista/${list.listaid}`}> 
                  
                </Link>
                <button className="delete-list-button" onClick={() => handleDeleteList(list.listaid)}>Eliminar Lista</button>
                </span>
              </li>
            ))}
          </ul>
          {!showCreateListForm && (
            <button className="create-list-button" onClick={() => setShowCreateListForm(true)}>Crear Nueva Lista</button>
          )}

          {showCreateListForm && (
            <div className="create-list-form">
              <label>Nueva Lista:</label>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <button className="create-list-button" onClick={handleCreateList}>Crear</button>
              <button className="stop-create-list-button" onClick={() => setShowCreateListForm(false)}>Cancelar</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
