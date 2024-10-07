import React from "react";
import "../styles/Home.css";
import Capa from '../assets/Capa.png'
import Logo from '../assets/avalia-muriae-logo.png';
import DigiLogo from '../assets/DigiLogo.png';
import { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [userType, setUserType] = useState(null); // Estado para controlar o tipo de usuário (admin ou professor)
    const [username, setUsername] = useState(""); // Estado para capturar o nome de usuário
    const [password, setPassword] = useState(""); // Estado para capturar a senha
    const [errorMessage, setErrorMessage] = useState(""); // Estado para exibir mensagens de erro
    const  navigate  = useNavigate();

    // Função para lidar com o envio do formulário de login
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginUrl = userType === "admin"
            ? "http://3.89.102.52/api/v1/login/"
            : "http://3.89.102.52/api/v1/login/teacher/";

        const loginData = {
            username: username,
            password: password,
        };

        try {
                const response = await axios.post(loginUrl, loginData);
                if (response.data && response.data.acess) {
                    console.log("Login bem-sucedido", response.data);
                    localStorage.setItem('access', response.data.access);
                    localStorage.setItem('username', response.data.username);
                    alert("logado com sucesso!");
                    navigate('/index');
                } else {
                    setErrorMessage("Usuário ou senha incorretos");
                }
            } catch (error) {
                // Verifica se há um erro de resposta do servidor e trata adequadamente
            if (error.response) {
                console.error("Erro na resposta do servidor:", error.response.data);
                setErrorMessage(error.response.data.detail || "Usuário ou senha incorretos");
            } else {
                console.error("Erro no login:", error);
                setErrorMessage("Ocorreu um erro ao tentar fazer login.");
            }
        }
    };

    // Função para renderizar o formulário de login com base no tipo de usuário
    const renderLoginForm = () => {
        return (
            <div className="login-box">
                <h2>Bem-vindo {userType === "admin" ? "Administrador" : "Professor"}!</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="username"
                        placeholder="Digite seu Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Atualiza o estado do nome de usuário
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
                    />
                    <button className="btn-login" type="submit">ENTRAR</button>
                </form>
                {errorMessage && <p className="error">{errorMessage}</p>} {/* Exibe mensagem de erro */}
                <button className="btn-back" onClick={() => {setUserType(null); setErrorMessage("");}}>Voltar</button>
            </div>
        );
    };

    return (
        <div>
            <div className="container">
                <div className="left-panel">
                    <img
                        src={Capa}
                        alt="Imagem de fundo"
                        className="background-image"
                    />
                </div>
                <div className="right-panel">
                    <img
                        src={Logo}
                        alt="Logo Avalia Muriaé"
                        className="logo"
                    />
                    <div className="btn-txt-align">
                    {userType === null ? (
                            <>
                        <h2>Bem-vindo ao seu portal de Lançamento de notas!</h2>
                        <p>Por favor, selecione uma <strong>opção</strong>:</p>
                        <div className="button-container">
                            <button
                                className="btn"
                                onClick={() => setUserType("admin")} // Ajustar rota
                            >
                                SOU ADMINISTRADOR
                            </button>
                            <button
                                className="btn"
                                onClick={() => setUserType("professor")} // Ajustar rota
                            >
                                SOU PROFESSOR
                            </button>
                        </div>
                        </>
                    ) : (
                        renderLoginForm() // Renderiza o formulário de login
                    )}
                    </div>
                    <footer className="footer">
                        Powered By <img
                            src={DigiLogo}
                            alt="Logo Digiescola"
                            className="digilogo"
                        />
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Home;
