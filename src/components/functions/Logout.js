import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Certifique-se de criar ou importar o arquivo CSS correto

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token e o nome do usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');

    // Redireciona para a página de login
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <p>Logout</p>
    </button>
  );
};

export default Logout;
