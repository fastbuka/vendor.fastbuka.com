import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; 

interface PayloadProps {
  id?: string;
  email?: string;
  name?: string;
}

interface AppContextProps {
  user: PayloadProps | null;  
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<PayloadProps | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage?.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const USER = jwtDecode<PayloadProps>(token); 
        setUser(USER);
      } catch (error) {
        console.error('Failed to decode token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  console.log("User: ", user);  

  const value: AppContextProps = { user };  

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
