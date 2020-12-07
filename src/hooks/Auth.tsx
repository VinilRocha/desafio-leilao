import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  name: string;
}

interface LoginCredentials {
  user: string;
  password: string;
}

interface AuthContextData {
  user: string;
  logIn(credentials: LoginCredentials): Promise<void> | boolean;
  logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Leiloes:token');
    const name = localStorage.getItem('@Leiloes:userName');
    if (token && name) {
      return { token, name };
    }

    return {} as AuthState;
  });

  const logIn = useCallback(async ({ user, password }) => {
    const response = await api.post('login', { user, password });
    const { token, name } = response.data;

    localStorage.setItem('@Leiloes:token', token);
    localStorage.setItem('@Leiloes:userName', name);

    setData({ token, name });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('@Leiloes:token');
    localStorage.removeItem('@Leiloes:userName');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.name, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
