import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/pages/home';
import GerenciarEquipamentos from './components/layout/GerenciarEquipamentos';
import MainLayout from './components/layout/MainLayout'; // Importando o layout principal

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas fora do layout principal */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas com o MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/gerenciar-equipamentos" element={<GerenciarEquipamentos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
