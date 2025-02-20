'use client';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { useAuthContext } from '@/hooks/useAuthContext';
import { logIn } from '@/utils/auth';
import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuth } = useAuthContext();

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    setLoginError(null);

    e.preventDefault();

    const startLoginLoading = setTimeout(() => {
      setLoginLoading(true);
    }, 500);

    try {
      const authenticationResult = await logIn(email, password);
      clearTimeout(startLoginLoading);
      setLoginLoading(false);
      if (authenticationResult) {
        setAuth(authenticationResult);
      } else {
        throw new Error('failed to login -- no response from cognito login');
      }
    } catch (e) {
      clearTimeout(startLoginLoading);
      setLoginLoading(false);
      // TODO: handle other specific errors
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
      <form onSubmit={handleLoginSubmit}>
        <div className="flex flex-col gap-3">
          <TextInput
            type="email"
            autoComplete="email"
            placeholder="Email"
            state={email}
            setState={setEmail}
            onChange={() => setLoginError(null)}
          />
          <TextInput
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            state={password}
            setState={setPassword}
            onChange={() => setLoginError(null)}
          />
          <Button
            kind="primary"
            text="Submit"
            type="submit"
            onClick={handleLoginSubmit}
            isLoading={loginLoading}
            disabled={email.length === 0 || password.length === 0}
          />
          {loginError ? (
            <div className="flex justify-center">
              <div className="text-red-500">{loginError}</div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Login;
