import { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initialize user from LocalStorage so it survives refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // 2. Login Function: Save user to LocalStorage
  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data)); // <--- SAVE USER
    setToken(data.token);
    setUser(data);
    return data;
  };

  // 3. Register Function: Save user to LocalStorage
  const register = async (name, email, password) => {
    const { data } = await API.post('/auth/register', {
      name,
      email,
      password,
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data)); // <--- SAVE USER
    setToken(data.token);
    setUser(data);
    return data;
  };

  // 4. Logout Function: Clear everything
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo'); // <--- CLEAR USER
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
