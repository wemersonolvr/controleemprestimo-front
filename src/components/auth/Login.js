import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import api from '../../api';
import axios from 'axios';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', {login, senha: password });
        // Armazena o token e o nome do usuário no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('nomeUsuario', response.data.nome);
      navigate('/home');
    } catch (err) {
      setError('Login ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" > Entrar</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;
