import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authenticate = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GITHUB_USER_URL, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
