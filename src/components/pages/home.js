import React, { useEffect, useState } from 'react';
import Logout from '../functions/Logout'

const Home = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    // Recupera o nome do usuário do localStorage
    const nome = localStorage.getItem('nomeUsuario');
    setNomeUsuario(nome);
  }, []);

  return (
    <div>
      <h1>Bem-vindo à página Home!</h1>
      {nomeUsuario && <h2>Olá, {nomeUsuario}!</h2>}
      <Logout />
    </div>
  );
};

export default Home;
