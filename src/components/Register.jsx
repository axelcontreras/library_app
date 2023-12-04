import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/src/styles/Register.css';


const Register = ({ api_url }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reinicia el estado de error
    setErrorMessage('');

    try {
      // Enviar la solicitud POST al backend para crear un nuevo usuario
      const response = await axios.post(`${api_url}/create_user`, { username, password });

      // Manejar la respuesta del servidor
      console.log(response.data);
      alert(response.data.mensaje); // Puedes mostrar un mensaje de éxito al usuario
    } catch (error) {
      // Manejar errores de la solicitud al servidor
      console.error('Error al registrar usuario:', error);

      if (error.response) {
        // Si hay una respuesta del servidor con un código de estado diferente de 2xx, muestra el mensaje de error
        setErrorMessage(error.response.data.mensaje || 'Error desconocido');
      } else if (error.request) {
        // Si no hay respuesta del servidor, muestra un mensaje de error en la conexión
        setErrorMessage('Error en la conexión');
      } else {
        // Si ocurre algún otro error, muestra un mensaje genérico
        setErrorMessage('Error desconocido');
      }
    }
  };

  return (
    <div className='register-form'>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
        </label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <label>
          Password:
        </label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Registrate</button>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center'}}>{errorMessage}</p>}
      </form>
      <p>¿Ya tienes una cuenta?</p>
      <Link to="/login">
        <button>Iniciar sesión</button>
      </Link>
    </div>
  );
};

export default Register;
