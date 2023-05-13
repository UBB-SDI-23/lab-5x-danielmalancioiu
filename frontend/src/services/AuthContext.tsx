import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextData {
  user: string;
  setUser: (user: string) => void;
}

const AuthContext = createContext<AuthContextData>({
  user: '',
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState('');
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => useContext(AuthContext);
