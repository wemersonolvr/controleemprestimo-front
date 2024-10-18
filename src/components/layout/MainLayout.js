import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Assumindo que sua sidebar está nesse arquivo
import './MainLayout.css'; // Estilos para o layout

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Outlet /> {/* Onde o conteúdo das rotas vai ser renderizado */}
      </div>
    </div>
  );
};

export default MainLayout;
