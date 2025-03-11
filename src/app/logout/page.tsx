'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { logOut } from '@/utils/auth';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loading-icons';

const LogOut = () => {
  const { setAuth, auth } = useAuthContext();

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (auth) {
        try {
          await logOut(auth.accessToken);
        } catch (e) {
          if (e instanceof NotAuthorizedException) {
            // access token already expired, do nothing
          } else {
            console.error(e);
            setError('failed to log out');
            return;
          }
        }
        setAuth(null);
      }
      router.push('/');
    })();
  }, [setAuth, auth, router]);

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-[10%] flex flex-col items-center gap-3">
        <div className="text-xl">Logging Out</div>
        {error === null ? (
          <Oval width="3rem" height="3rem" />
        ) : (
          <div>Error logging out, reload to try again</div>
        )}
      </div>
    </div>
  );
};

export default LogOut;
