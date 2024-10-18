import React from 'react';
import './LoanForm.css';

const LoanForm = ({
  loanInfo,
  setLoanInfo,
  selectedEquipamentos,
  selectedAcessorios,
  equipamentos,
  handleLoanSubmit
}) => {
  return (
    <div className="loan-form">
      <h2>Emprestar Equipamento</h2>
      {selectedEquipamentos && (
        <div>
          <h3>Equipamento Selecionado: {equipamentos.find(e => e.id === selectedEquipamentos)?.nome}</h3>
        </div>
      )}
      {selectedAcessorios.length > 0 && (
        <div>
          <h3>Acessórios Selecionados:</h3>
          <ul>
            {selectedAcessorios.map(id => (
              <li key={id}>{equipamentos
                .flatMap(e => e.acessorios)
                .find(a => a.id === id)?.nome}</li>
            ))}
          </ul>
        </div>
      )}
      <input
        type="text"
        placeholder="Nome"
        value={loanInfo.nome}
        onChange={(e) => setLoanInfo({ ...loanInfo, nome: e.target.value })}
      />
      <input
        type="text"
        placeholder="Sobrenome"
        value={loanInfo.sobrenome}
        onChange={(e) => setLoanInfo({ ...loanInfo, sobrenome: e.target.value })}
      />
      <input
  type="tel"
  placeholder="Telefone"
  value={loanInfo.telefone}
  onChange={(e) => setLoanInfo({ ...loanInfo, telefone: e.target.value.replace(/\D/g, '') })} // Substitui qualquer caractere não numérico
  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} // Garante que só números sejam permitidos
  inputMode="numeric"
  pattern="[0-9]*"
  className="input-field"
/>

      <input
        type="text"
        placeholder="Setor"
        value={loanInfo.setor}
        onChange={(e) => setLoanInfo({ ...loanInfo, setor: e.target.value })}
      />
      <input
        type="date"
        placeholder="Data de Devolução"
        value={loanInfo.data_devolucao}
        onChange={(e) => setLoanInfo({ ...loanInfo, data_devolucao: e.target.value })}
      />
      <button onClick={handleLoanSubmit}>Emprestar</button>
    </div>
  );
};

export default LoanForm;
