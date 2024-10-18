// LoadingOverlay.js
import React from 'react';
import './LoadingOverlay.css'; // Adicione o CSS para o overlay

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Devolvendo equipamento...</p>
    </div>
  );
};

export default LoadingOverlay;
