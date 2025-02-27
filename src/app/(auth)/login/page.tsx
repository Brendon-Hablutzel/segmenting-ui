'use client';

import { authenticationResultTypeToAuthData } from '@/app/lib/types';
import Button from '@/components/Button';
import { useAuthContext } from '@/hooks/useAuthContext';
import { logIn } from '@/utils/auth';
import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { setAuth } = useAuthContext();

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      setLoginLoading(true);
      const authResult = await logIn(email, password);
      setLoginLoading(false);

      if (authResult) {
        setAuth(authenticationResultTypeToAuthData(authResult));
      } else {
        throw new Error('failed to login--no response from cognito login');
      }
    } catch (e) {
      setLoginLoading(false);
      if (e instanceof UserNotFoundException) {
        setLoginError('Email or password is incorrect');
      } else {
        console.error(e);
        setLoginError('Login failed');
      }
    }
  };

  return (
    <div>
      <h1 className="text-text-light text-center text-5xl">Login</h1>
      <h4 className="text-text-light text-center text-xl py-5">
        Welcome back!
      </h4>
      <form onSubmit={onLoginSubmit}>
        <div className="flex flex-col gap-3">
          <input
            className="bg-inherit border-white/20 border-[1px] rounded-3xl py-2 px-4 w-full text-xl text-text-light placeholder:text-text-light/50"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-inherit border-white/20 border-[1px] rounded-3xl py-2 px-4 w-full text-xl text-text-light placeholder:text-text-light/50"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError ? (
            <div className="text-red-600 text-center">{loginError}</div>
          ) : null}
          <Button
            kind="primary"
            text="Submit"
            isLoading={loginLoading}
            disabled={email.length === 0 || password.length === 0}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
