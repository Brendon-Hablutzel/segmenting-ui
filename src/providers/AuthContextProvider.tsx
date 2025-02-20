'use client';

import { AuthContext } from '@/contexts/AuthContext';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { useState, ReactNode, useEffect, useMemo } from 'react';

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authLoaded, setAuthLoaded] = useState(false);

  const [auth, setAuth] = useState<AuthenticationResultType | null>(null);

  useEffect(() => {
    const localAuth = localStorage.getItem('segmentingAuth');
    setAuth(localAuth ? JSON.parse(localAuth) : localAuth);
    setAuthLoaded(true);
  }, []);

  const memoizedAuth = useMemo(() => auth, [auth]);

  useEffect(() => {
    localStorage.setItem('segmentingAuth', JSON.stringify(memoizedAuth));
  }, [memoizedAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, authLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
