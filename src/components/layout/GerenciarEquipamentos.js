import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GerenciarEquipamentos.css';

const GerenciarEquipamentos = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [novoEquipamento, setNovoEquipamento] = useState({ nome: '', descricao: '' });
  const [novoAcessorio, setNovoAcessorio] = useState({ nome: '', equipamento_id: '', quantidade: 1 });
  
  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/equipamentos/disponiveis');
      setEquipamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
    }
  };

  const handleCreateEquipamento = async () => {
    try {
      await axios.post('http://localhost:3000/api/equipamentos', novoEquipamento);
      setNovoEquipamento({ nome: '', descricao: '' });
      fetchEquipamentos();
    } catch (error) {
      console.error('Erro ao cadastrar equipamento:', error);
    }
  };

  const handleDeleteEquipamento = async (equipamentoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/equipamentos/${equipamentoId}`);
      fetchEquipamentos();
    } catch (error) {
      console.error('Erro ao excluir equipamento:', error);
    }
  };

  const handleUpdateEquipamento = async (equipamentoId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/api/equipamentos/${equipamentoId}`, updatedData);
      fetchEquipamentos();
    } catch (error) {
      console.error('Erro ao editar equipamento:', error);
    }
  };

  const handleCreateAcessorio = async () => {
    try {
      await axios.post('http://localhost:3000/api/acessorios', novoAcessorio);
      setNovoAcessorio({ nome: '', equipamento_id: '', quantidade: 1 });
      fetchEquipamentos();
    } catch (error) {
      console.error('Erro ao cadastrar acessório:', error);
    }
  };

  const handleDeleteAcessorio = async (acessorioId) => {
    try {
      await axios.delete(`http://localhost:3000/api/acessorios/${acessorioId}`);
      fetchEquipamentos();
    } catch (error) {
      console.error('Erro ao excluir acessório:', error);
    }
  };

  return (
    <div className="gerenciar-equipamentos-container">
      <h1>Gerenciar Equipamentos</h1>

      <div className="form-add-equipamento">
        <h2>Adicionar Novo Equipamento</h2>
        <input
          type="text"
          placeholder="Nome do Equipamento"
          value={novoEquipamento.nome}
          onChange={(e) => setNovoEquipamento({ ...novoEquipamento, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição do Equipamento"
          value={novoEquipamento.descricao}
          onChange={(e) => setNovoEquipamento({ ...novoEquipamento, descricao: e.target.value })}
        />
        <button onClick={handleCreateEquipamento}>Adicionar Equipamento</button>
      </div>

      <div className="equipamentos-list">
        {equipamentos.map((equipamento) => (
          <div className="equipamento-card" key={equipamento.id}>
            <h3>{equipamento.nome} - {equipamento.descricao}</h3>
            <button onClick={() => handleDeleteEquipamento(equipamento.id)}>Excluir Equipamento</button>

            <div>
              <input
                type="text"
                placeholder="Novo nome"
                onChange={(e) => handleUpdateEquipamento(equipamento.id, { nome: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nova descrição"
                onChange={(e) => handleUpdateEquipamento(equipamento.id, { descricao: e.target.value })}
              />
            </div>

            <div className="acessorios-list">
              <h4>Acessórios:</h4>
              {equipamento.acessorios.map((acessorio) => (
                <div className="acessorio-item" key={acessorio.id}>
                  <p>{acessorio.nome} - Quantidade: {acessorio.quantidade}</p>
                  <button onClick={() => handleDeleteAcessorio(acessorio.id)}>Excluir Acessório</button>
                </div>
              ))}
            </div>

            <div className="form-add-acessorio">
              <input
                type="text"
                placeholder="Nome do Acessório"
                value={novoAcessorio.nome}
                onChange={(e) => setNovoAcessorio({ ...novoAcessorio, nome: e.target.value, equipamento_id: equipamento.id })}
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={novoAcessorio.quantidade}
                onChange={(e) => setNovoAcessorio({ ...novoAcessorio, quantidade: e.target.value })}
              />
              <button onClick={handleCreateAcessorio}>Adicionar Acessório</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciarEquipamentos;
