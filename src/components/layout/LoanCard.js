import React, { useState } from 'react';
import axios from 'axios';
import LoadingOverlay from './LoadingOverlay'; // Importar o componente de Loading
import './LoanCard.css'

const LoanCard = ({ emprestimo, onLoanUpdated }) => {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loading

  const handleDevolucao = async () => {
    setIsLoading(true); // Ativa o loading
    try {
      // Faz a requisição para devolver o equipamento
      const response = await axios.put(`http://localhost:3000/api/emprestimos/${emprestimo.id}/devolver`);

      if (response.status === 200) {
        // Chama o callback para atualizar a lista de empréstimos e equipamentos
        if (onLoanUpdated) {
          onLoanUpdated(emprestimo.equipamento_id); // Passa o ID do equipamento devolvido
        }
      }
    } catch (error) {
      console.error('Erro ao devolver o equipamento:', error);
      alert('Erro ao devolver o equipamento.');
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="loan-card">
      {isLoading && <LoadingOverlay />} {/* Exibe o overlay de loading */}
      <h3>{emprestimo.nome} {emprestimo.sobrenome}</h3>
      <p><strong>Equipamento:</strong> {emprestimo.equipamentos_nomes}</p>
      {emprestimo.acessorios_nomes && emprestimo.acessorios_nomes.length > 0 ? (
        <p><strong>Acessórios:</strong> {emprestimo.acessorios_nomes.join(', ')}</p>
      ) : (
        <p><strong>Acessórios:</strong> Nenhum</p>
      )}
      <p><strong>Data de Hoje:</strong> {emprestimo.data_emprestimo}</p>
      <p><strong>Status:</strong> {emprestimo.status}</p>
      <p><strong>Contato:</strong> {emprestimo.telefone}</p>
      <p><strong>Previsão de Devolução:</strong> {emprestimo.data_devolucao}</p>
      <p><strong>Realizado por:</strong> {emprestimo.usuario_nome}</p>

      {emprestimo.status !== 'devolvido' && (
        <button onClick={handleDevolucao} className="devolvido-btn">Devolvido</button>
      )}
    </div>
  );
};

export default LoanCard;
