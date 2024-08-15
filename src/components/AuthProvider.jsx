import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUserRole = async (userId, newRoleId) => {
    try {
      const API_URL = "api/";
      const response = await fetch(`${API_URL}users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role_id: newRoleId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const updatedUser = { ...user, role_id: newRoleId };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const getUserId = () => user?.id;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, getUserId, updateUserRole }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
