import { AuthDataType } from '@/app/lib/types';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  auth: AuthDataType | null;
  setAuth: (auth: AuthDataType | null) => void;
  authLoaded: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authLoaded, setAuthLoaded] = useState(false);

  const [auth, setAuth] = useState<AuthDataType | null>(null);

  useEffect(() => {
    const localAuth = localStorage.getItem('segmentingAuth');
    setAuth(localAuth ? JSON.parse(localAuth) : localAuth);
    setAuthLoaded(true);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      setAuthLoaded(false);
      if (auth) {
        localStorage.setItem('segmentingAuth', JSON.stringify(auth));
      } else {
        localStorage.removeItem('segmentingAuth');
      }
      setAuthLoaded(true);
    }
  }, [auth, authLoaded]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, authLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
