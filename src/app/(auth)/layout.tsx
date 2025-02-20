'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { auth, authLoaded } = useAuthContext();

  // immediately redirect to the dashboard if already logged in
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (authLoaded) {
      if (auth !== null) {
        router.replace('/jobs');
      } else {
        setChecked(true);
      }
    }
  }, [authLoaded, auth, router]);

  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark p-4 flex justify-center">
      {checked ? (
        <div className="bg-bg-card w-[32rem] h-fit py-6 px-10 rounded-xl border-[1px] border-white/20 mt-[10vh]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
