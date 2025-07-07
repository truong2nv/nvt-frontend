import React, { createContext, useContext, useState } from 'react';
import * as authApi from '../api/authApi';

interface User {
  email: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    setLoggedIn(data);
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await authApi.register({ email, password, firstName, lastName });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');

    setLoggedIn(data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/signin';
  };

  const isAuthenticated = true;
  const setLoggedIn = (data: { email: string; userId: string; accessToken: string; refreshToken: string; }) =>{
    setUser({ email: data.email, userId: data.userId });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};