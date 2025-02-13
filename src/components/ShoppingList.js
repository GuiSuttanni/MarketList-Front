import React, { useState, useEffect } from 'react';
import axios from '../services/shoppingListService';
import Item from './Item';
import '../styles/ShoppingList.css';

function ShoppingList({ houseCode, onLogout }) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (houseCode) {
      axios.getItems(houseCode).then(setItems).catch(console.error);
    }
  }, [houseCode]);

  const addItem = () => {
    if (text.trim()) {
      axios.addItem(houseCode, { text }).then((newItem) => {
        setItems([...items, newItem]);
        setText('');
      });
    }
  };

  const updateItem = (id, newText) => {
    if (newText.trim()) {
      axios.updateItem(houseCode, id, { text: newText }).then(() => {
        setItems(items.map((item) => (item.id === id ? { ...item, text: newText } : item)));
      });
    }
  };

  const deleteItem = (id) => {
    axios.deleteItem(houseCode, id).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="shopping-list-container">
      <div className="logout-container">
        <button onClick={onLogout} className="logout-button">Sair</button>
      </div>
      <h1>Lista de Compras</h1>
      <div className="input-group">
        <input
          className="text-input"
          placeholder="Adicionar um item..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="add-button" onClick={addItem}>Adicionar</button>
      </div>
      <ul className="items-list">
        {items.map((item) => (
          <Item key={item.id} item={item} onUpdate={updateItem} onDelete={deleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;