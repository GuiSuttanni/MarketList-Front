import React, { useState } from 'react';
import '../styles/Item.css';

function Item({ item, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const handleUpdate = () => {
    if (newText.trim()) {
      onUpdate(item.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li className="item">
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button className="save-button" onClick={handleUpdate}>Salvar</button>
        </>
      ) : (
        <>
          <span className="item-text">{item.text}</span>
          <button className="edit-button" onClick={() => setIsEditing(true)}><i className="fas fa-edit"></i></button>
        </>
      )}
      <button className="delete-button" onClick={() => onDelete(item.id)}><i className="fas fa-trash"></i></button>
    </li>
  );
}

export default Item;