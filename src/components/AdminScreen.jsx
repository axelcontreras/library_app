// AdminScreen.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminScreen = ({ onAddBook }) => (
  <div>
    <h1>Añadir Libros (Admin)</h1>
    <form onSubmit={(e) => { /* Lógica para manejar la adición de libros */ }}>
      <label>
        Nombre del Libro:
        <input type="text" name="bookName" />
      </label>
      <label>
        Autor del Libro:
        <input type="text" name="bookAuthor" />
      </label>
      <button type="submit">Añadir Libro</button>
    </form>
    <Link to="/">Ir a la Pantalla Principal</Link>
  </div>
);

export default AdminScreen;
