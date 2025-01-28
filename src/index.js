import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilo global opcional
import App from './App'; // Componente principal da aplicação

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);