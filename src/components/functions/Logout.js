import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
