import React, { useState } from 'react';
import '../styles/Item.css'; // Import styles

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
          <button className="save-button" onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span className="item-text">{item.text}</span>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button className="delete-button" onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
}

export default Item;