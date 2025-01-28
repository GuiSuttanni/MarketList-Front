import React, { useState } from 'react';
import axios from '../services/shoppingListService';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [houseCode, setHouseCode] = useState('');

  const handleLogin = () => {
    if (houseCode.trim()) {
      axios.verifyHouse(houseCode).then((exists) => {
        if (exists) onLogin(houseCode);
        else alert('Código da casa não encontrado.');
      });
    }
  };

  const handleRegister = () => {
    if (houseCode.trim()) {
      axios.registerHouse(houseCode).then(() => {
        alert('Casa registrada com sucesso!');
        onLogin(houseCode);
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Lista de Compras</h1>
      <input
        type="text"
        placeholder="Digite o código da casa"
        value={houseCode}
        onChange={(e) => setHouseCode(e.target.value)}
      />
      <div className="button-group">
        <button onClick={handleLogin}>Entrar</button>
        <button onClick={handleRegister}>Registrar</button>
      </div>
    </div>
  );
}

export default Login;