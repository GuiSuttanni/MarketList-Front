import React, { useState, useEffect } from 'react';
import ShoppingList from './components/ShoppingList';
import Login from './components/Login';
import './App.css';

function App() {
  const [houseCode, setHouseCode] = useState(localStorage.getItem('houseCode') || '');

  const handleLogin = (code) => {
    localStorage.setItem('houseCode', code);
    setHouseCode(code);
  };

  const handleLogout = () => {
    localStorage.removeItem('houseCode');
    setHouseCode('');
  };

  return (
    <div className="app-container">
      {houseCode ? (
        <div className="centered-container">
          <button onClick={handleLogout} className="logout-button">Sair</button>
          <ShoppingList houseCode={houseCode} />
        </div>
      ) : (
        <div className="centered-container">
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;