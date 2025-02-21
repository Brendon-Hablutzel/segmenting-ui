'use client';

import logout from '@/app/actions/logout';
import { startTransition, useActionState, useEffect } from 'react';

// TODO: style

const LogOut = () => {
  const [, action] = useActionState(logout, undefined);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [action]);

  return <div>logging out...</div>;
};

export default LogOut;
