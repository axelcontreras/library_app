// main.jsx
import React from 'react';
import { createRoot } from 'react-dom';
import { App } from './src/Index';
import './src/styles/App.css';


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
