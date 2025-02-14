import React, { useState, useEffect } from 'react';
import axios from '../services/shoppingListService';
import Item from './Item';
import '../styles/ShoppingList.css';

function ShoppingList({ houseCode, onLogout }) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (houseCode) {
      setIsLoading(true);
      axios.getItems(houseCode)
        .then(setItems)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [houseCode]);

  const addItem = () => {
    if (text.trim()) {
      setIsLoading(true);
      axios.addItem(houseCode, { text })
        .then((newItem) => {
          setItems([...items, newItem]);
          setText('');
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  const updateItem = (id, newText) => {
    if (newText.trim()) {
      setIsLoading(true);
      axios.updateItem(houseCode, id, { text: newText })
        .then(() => {
          setItems(items.map((item) => (item.id === id ? { ...item, text: newText } : item)));
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  const deleteItem = (id) => {
    setIsLoading(true);
    axios.deleteItem(houseCode, id)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="shopping-list-container">
      <div className="logout-container">
        <button onClick={onLogout} className="logout-button" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Sair'}
        </button>
      </div>
      <h1>Lista de Compras</h1>
      <div className="input-group">
        <input
          className="text-input"
          placeholder="Adicionar um item..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <button className="add-button" onClick={addItem} disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Adicionar'}
        </button>
      </div>
      <ul className="items-list">
        {items.map((item) => (
          <Item key={item.id} item={item} onUpdate={updateItem} onDelete={deleteItem} isLoading={isLoading} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;