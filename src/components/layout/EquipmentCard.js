import React from 'react';
import './EquipmentCard.css';

const EquipmentCard = ({ equipamento, onSelect, isSelected }) => {
  const isEmprestado = equipamento.status === 'emprestado'; // Verifica se o equipamento está emprestado

  return (
    <div
      className={`equipamento-card ${isEmprestado ? 'disabled' : isSelected ? 'selected' : ''}`}
      onClick={!isEmprestado ? onSelect : undefined} // Desativa o clique se estiver emprestado
      style={{
        backgroundColor: isEmprestado ? '#d3d3d3' : isSelected ? '#d0f0c0' : 'white', // Verde claro se selecionado
        cursor: isEmprestado ? 'not-allowed' : 'pointer' // Muda o cursor para "não permitido" se emprestado
      }}
    >
      <h3>{equipamento.nome}</h3>
      <p>{equipamento.descricao}</p>
      {isEmprestado && <p className="status-emprestado">Emprestado</p>} {/* Exibe um status de "emprestado" */}
    </div>
  );
};

export default EquipmentCard;
