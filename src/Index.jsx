// index.js
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import UserProfile from './components/UserProfile';
import ListScreen from './components/ListScreen';
import AdminScreen from './components/AdminScreen';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';

const api_url = "http://localhost:5000";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${api_url}/user`, { withCredentials: true });
        setIsAuthenticated(true);
        console.log('Respuesta de verificación de autenticación:', response);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        console.log('Usuario autenticado correctamente.');
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  }  

  return (
    <Router>
      <div>
        <Navigation api_url={api_url} />
        <Routes>
          <Route path="/login" element={<Login api_url={api_url} />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <MainScreen api_url={api_url} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/perfil"
            element={isAuthenticated ? <UserProfile api_url={api_url} /> : <Navigate to="/login" />}
          />
          <Route path="/perfil/lista/:id" element={isAuthenticated ? <ListScreen api_url={api_url} /> : <Navigate to="/login" />} />
          <Route
            path="/register"
            element={isAuthenticated ? <Register api_url={api_url} /> : <Navigate to="/login" />}
          />
          <Route path="/admin" element={isAuthenticated ? <AdminScreen /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
