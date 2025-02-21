'use client';

import { useState } from 'react';
import Confirm from './Confirm';
import AccountCreation from './AccountCreation';

// TODO: add a way for the user to get back to confirm without having to go through signup
const Signup = () => {
  const [view, setView] = useState<'signup' | 'confirm'>('signup');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      {view === 'signup' ? (
        <AccountCreation
          setView={setView}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <Confirm email={email} password={password} />
      )}
    </div>
  );
};

export default Signup;
