'use client';

import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { createContext } from 'react';

interface AuthContextType {
  auth: AuthenticationResultType | null;
  setAuth: (auth: AuthenticationResultType | null) => void;
  authLoaded: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
