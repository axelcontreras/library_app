import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '/src/styles/Login.css';


const Login = ({ api_url }) => {
  const url = `${api_url}/login`;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Reinicia el estado de error
    setError('');

    // Realiza la solicitud de inicio de sesión al servidor utilizando Axios
    try {
      const response = await axios.post(url, {
        username: username,
        password: password,
      },{
        withCredentials: true
      });

      // Si la respuesta es exitosa, redirige a la página de inicio
      console.log('Respuesta del servidor:', response.data);
      window.location.href = '/';
    } catch (error) {
      // Maneja los errores de la solicitud
      console.error('Error en la solicitud:', error);

      if (error.response) {
        // Si hay una respuesta del servidor con un código de estado diferente de 2xx, muestra el mensaje de error
        setError(error.response.data.mensaje || 'Error desconocido');
      } else if (error.request) {
        // Si no hay respuesta del servidor, muestra un mensaje de error en la conexión
        setError('Error en la conexión');
      } else {
        // Si ocurre algún otro error, muestra un mensaje genérico
        setError('Error desconocido');
      }
    }
  };

  return (
    <div className='login-form'>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="username">
          Nombre de Usuario:
        </label>
        <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
        <label htmlFor="password">
          Contraseña:
        </label>
        <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
        
        <button type="submit">Iniciar Sesión</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>¿No tienes una cuenta?</p>
      <Link to="/register">
        <button>Registrarse</button>
      </Link>
    </div>
  );
};

export default Login;
