'use client';

import login from '@/app/actions/login';
import Button from '@/components/Button';
import { useActionState, useState } from 'react';

const Login = () => {
  const [state, action, pending] = useActionState(login, undefined);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1 className="text-text-light text-center text-5xl">Login</h1>
      <h4 className="text-text-light text-center text-xl py-5">
        Welcome back!
      </h4>
      <form action={action}>
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
          {(state?.errors ?? []).map((err, idx) => (
            <div className="text-red-600 text-center" key={idx}>
              {err}
            </div>
          ))}
          <Button
            kind="primary"
            text="Submit"
            isLoading={pending}
            disabled={email.length === 0 || password.length === 0}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
