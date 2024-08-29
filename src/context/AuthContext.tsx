/*import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

interface AuthContextProps {
  authenticated: boolean;
  login: (login: string, senha: string) => Promise<void>;
  register: (nome: string, login: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const login = async (login: string, senha: string) => {
    const response = await axios.post('/api/admin/login', { login, senha });
    localStorage.setItem('token', response.data.token);
    setAuthenticated(true);
  };

  const register = async (nome: string, login: string, senha: string) => {
    await axios.post('/api/admin/register', { nome, login, senha });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
*/