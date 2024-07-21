import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardForRoom.css'; 

const CardForRoom = ({ title, image, info, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edit-room/${id}`);
  };

  return (
    <div className="card">
      <img src="expense-tracker.jpg" alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <ul className="info-list">
          {info.map((person, index) => (
            <li key={index} className="info-item">
              {person?.name}
            </li>
          ))}
        </ul>
        <button className="add-expense-button" onClick={handleClick}>
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default CardForRoom;
