"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { QueryClient } from 'react-query';
import { getToken } from '@/utils/token';
import { useLogout } from '@/queries/auth';

interface AuthContextProps {
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children, queryClient }: { children: ReactNode; queryClient: QueryClient }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logoutMutation = useLogout(queryClient);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(Boolean(token));
  }, []);

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}