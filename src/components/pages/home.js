import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Sidebar from '../layout/Sidebar';
import EquipmentCard from '../layout/EquipmentCard';
import AccessoryCard from '../layout/AcessoryCard';
import LoanCard from '../layout/LoanCard';
import LoanForm from '../layout/LoanForm'; // Importando o novo LoanForm
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamentosEmprestados, setEquipamentosEmprestados] = useState([]);
  const [selectedEquipamentos, setSelectedEquipamentos] = useState([]); // Para armazenar múltiplos equipamentos
  const [selectedAcessorios, setSelectedAcessorios] = useState([]); // Para armazenar acessórios selecionados
  const [loanInfo, setLoanInfo] = useState({
    nome: '',
    sobrenome: '',
    telefone: '',
    setor: '',
    data_devolucao: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nome = localStorage.getItem('nomeUsuario');
    const id = localStorage.getItem('usuarioId');
    setNomeUsuario(nome);
    setUsuarioId(id);
    if (!token) {
      navigate('/');
    }
    fetchEquipamentos();
    fetchLoans();
  }, [navigate]);

  const fetchEquipamentos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/equipamentos/disponiveis');
      setEquipamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar os equipamentos:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/emprestimos');
      setEquipamentosEmprestados(response.data);
    } catch (error) {
      console.error('Erro ao buscar os empréstimos:', error);
    }
  };

  const handleLoanSubmit = async () => {
    if (selectedEquipamentos.length === 0 && selectedAcessorios.length === 0) {
      alert('Selecione pelo menos um equipamento ou acessório para emprestar.');
      return;
    }

    if (!usuarioId) {
      alert('Usuário não identificado. Faça o login novamente.');
      return;
    }

    try {
      const payload = {
        usuario_id: usuarioId,
        equipamentos_ids: selectedEquipamentos, // Lista de equipamentos selecionados
        acessorios: selectedAcessorios, // Acessórios selecionados
        ...loanInfo,
      };
      await axios.post('http://localhost:3000/api/emprestimos', payload);
      setSelectedEquipamentos([]); // Limpar seleção
      setSelectedAcessorios([]); // Limpar seleção de acessórios
      setLoanInfo({ nome: '', sobrenome: '', telefone: '', setor: '', data_devolucao: '' });
      fetchLoans(); // Atualiza a lista de empréstimos
      fetchEquipamentos(); // Atualiza a lista de equipamentos
    } catch (error) {
      console.error('Erro ao realizar o empréstimo:', error);
      alert('Erro ao realizar o empréstimo.');
    }
  };

  const handleSelectEquipamento = (equipamentoId) => {
    if (selectedEquipamentos.includes(equipamentoId)) {
      // Desmarca se já estiver selecionado
      setSelectedEquipamentos(selectedEquipamentos.filter(id => id !== equipamentoId));
    } else {
      // Adiciona à lista de selecionados
      setSelectedEquipamentos([...selectedEquipamentos, equipamentoId]);
    }
  };

  const handleSelectAcessorio = (acessorioId) => {
    if (selectedAcessorios.includes(acessorioId)) {
      setSelectedAcessorios(selectedAcessorios.filter(id => id !== acessorioId)); // Desmarca se já estiver selecionado
    } else {
      setSelectedAcessorios([...selectedAcessorios, acessorioId]); // Adiciona à lista de selecionados
    }
  };

  // Atualiza manualmente o estado dos equipamentos após a devolução
  const handleLoanUpdated = (devolvidoEquipamentoId) => {
    setEquipamentosEmprestados((prev) => prev.filter(emprestimo => emprestimo.equipamento_id !== devolvidoEquipamentoId));
    
    setEquipamentos((prev) => [
      ...prev,
      equipamentosEmprestados.find(emprestimo => emprestimo.equipamento_id === devolvidoEquipamentoId),
    ]);
  };

  return (
    <div className="home-container">
      <Sidebar />

      <div className="main-content">
        {nomeUsuario && <h2>Olá, {nomeUsuario}!</h2>}

        <div className="equipamentos-container">
          <h2>Equipamentos Disponíveis</h2>
          <div className="equipamentos-grid">
            {equipamentos.map((equipamento) => (
              <div key={`equipamento-${equipamento.id}`}>
                <EquipmentCard
                  equipamento={equipamento}
                  isSelected={selectedEquipamentos.includes(equipamento.id)} // Verifica se o equipamento está selecionado
                  onSelect={() => handleSelectEquipamento(equipamento.id)} // Seleciona/desmarca o equipamento
                />
                {/* Exibe os acessórios em cartões separados */}
                {equipamento.acessorios && equipamento.acessorios.map((acessorio) => (
                  <AccessoryCard
                    key={`acessorio-${acessorio.id}`}
                    acessorio={acessorio}
                    isSelected={selectedAcessorios.includes(acessorio.id)}
                    onSelect={() => handleSelectAcessorio(acessorio.id)} // Seleciona/desmarca o acessório
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Loan Form separada em um novo componente */}
        <LoanForm
          loanInfo={loanInfo}
          setLoanInfo={setLoanInfo}
          selectedEquipamentos={selectedEquipamentos} // Agora passamos a lista de equipamentos selecionados
          selectedAcessorios={selectedAcessorios}
          equipamentos={equipamentos}
          handleLoanSubmit={handleLoanSubmit}
        />

        <div className="emprestimos-container">
          <h2>Equipamentos Emprestados</h2>
          <div className="emprestimos-grid">
            {equipamentosEmprestados.map((emprestimo) => (
              <LoanCard key={emprestimo.id} emprestimo={emprestimo} onLoanUpdated={handleLoanUpdated}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
