import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '/src/styles/Navigation.css';


const Navigation = ({ api_url }) => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await fetch(`${api_url}/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      // Puedes realizar otras acciones después de cerrar sesión si es necesario

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className='nav'>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
      <ul className='nav-right'>
        <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
