import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          const res = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user);
        }
      } catch (error) {
        console.error('Token verification failed', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };

    verifyToken();
  }, [token]);

  const login = (userData, authToken) => {
    localStorage.setItem('token', authToken);
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};