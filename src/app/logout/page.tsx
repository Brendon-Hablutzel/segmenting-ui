'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { logOut } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Oval } from 'react-loading-icons';

const LogOut = () => {
  const { setAuth, auth } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (auth) {
        await logOut(auth.accessToken);
        setAuth(null);
      }
      router.push('/');
    })();
  }, [setAuth, auth, router]);

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-[10%] flex flex-col items-center gap-3">
        <div className="text-xl">Logging Out</div>
        <Oval width="3rem" height="3rem" />
      </div>
    </div>
  );
};

export default LogOut;
