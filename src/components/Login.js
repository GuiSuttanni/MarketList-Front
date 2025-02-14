import React, { useState } from 'react';
import axios from '../services/shoppingListService';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [houseCode, setHouseCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (houseCode.trim()) {
      setIsLoading(true);
      axios.verifyHouse(houseCode)
        .then((exists) => {
          if (exists) onLogin(houseCode);
          else alert('Código da casa não encontrado.');
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  const handleRegister = () => {
    if (houseCode.trim()) {
      setIsLoading(true);
      axios.registerHouse(houseCode)
        .then(() => {
          alert('Casa registrada com sucesso!');
          onLogin(houseCode);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
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
        disabled={isLoading}
      />
      <div className="button-group">
        <button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Registrar'}
        </button>
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Entrar'}
        </button>
      </div>
    </div>
  );
}

export default Login;