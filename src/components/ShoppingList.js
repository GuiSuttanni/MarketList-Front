import React, { useState, useEffect } from 'react';
import axios from '../services/shoppingListService';
import Item from './Item';
import '../styles/ShoppingList.css';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.getItems().then(setItems);
  }, []);

  const addItem = () => {
    if (text.trim()) {
      axios.addItem({ text }).then((newItem) => {
        setItems([...items, newItem]);
        setText('');
      });
    }
  };

  const updateItem = (id, newText) => {
    if (newText.trim()) {
      axios.updateItem(id, { text: newText }).then(() => {
        setItems(items.map((item) => (item.id === id ? { ...item, text: newText } : item)));
      });
    }
  };

  const deleteItem = (id) => {
    axios.deleteItem(id).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="shopping-list-container">
      <h1>Shopping List</h1>
      <div className="input-group">
        <input
          className="text-input"
          placeholder="Add an item..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="add-button" onClick={addItem}>Add</button>
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