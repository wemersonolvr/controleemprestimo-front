import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../functions/Logout'; // Importa o componente de Logout
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/home">Início</Link></li>
        <li><Link to="/gerenciar-equipamentos">Gerenciar Equipamentos</Link></li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
