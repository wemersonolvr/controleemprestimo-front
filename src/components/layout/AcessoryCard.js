import React from 'react';
import './AcessoryCard.css'

const AccessoryCard = ({ acessorio, onSelect }) => {
  return (
    <div className="acessorio-card" onClick={onSelect}>
      <h4>{acessorio.nome}</h4>
      <p>Quantidade: {acessorio.quantidade}</p>
    </div>
  );
};

export default AccessoryCard;
