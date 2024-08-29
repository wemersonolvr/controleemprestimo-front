// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Adicione um arquivo CSS para estilizar a sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/add-equipment">Adicionar Equipamento</Link></li>
        <li><Link to="/logout">Sair</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
