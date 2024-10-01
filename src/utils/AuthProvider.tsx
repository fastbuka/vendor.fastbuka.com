import React, { createContext, useContext, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

interface User {
  id: string; 
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token; 
    console.log("Token from cookies: ", token);

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch('/api/user');
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const userData = await response.json();
          setUser(userData); 
          setIsAuthenticated(true);
          console.log("User Data: ", userData);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setIsAuthenticated(false);
          window.location.href = '/auth/login';
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    } else {
      setIsAuthenticated(false);
      window.location.href = '/auth/login';
      console.log("No token found")
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AuthProvider');
  }
  return context;
};
