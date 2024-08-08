'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext<any>(null);

interface AuthProviderProps {
  children: ReactNode; // children의 타입을 명시적으로 지정
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}


