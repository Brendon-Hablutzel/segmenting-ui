import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { useState, ReactNode, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const localAuth = localStorage.getItem('segmentingAuth');

  const [auth, setAuth] = useState<AuthenticationResultType | null>(
    localAuth ? JSON.parse(localAuth) : null,
  );

  useEffect(() => {
    localStorage.setItem('segmentingAuth', JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
