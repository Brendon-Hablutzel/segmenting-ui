'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth, authLoaded } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (authLoaded && auth) {
      router.replace('/jobs');
    }
  }, [auth, authLoaded, router]);

  return !authLoaded || auth ? null : (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark p-4 flex justify-center">
      <div className="bg-bg-card w-[32rem] h-fit py-6 px-5 lg:px-10 rounded-xl border-[1px] border-white/20 mt-[10vh]">
        {children}
      </div>
    </div>
  );
}
