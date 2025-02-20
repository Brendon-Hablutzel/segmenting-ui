'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { auth, authLoaded } = useAuthContext();

  // if user is not logged in, immediately redirect back to home
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (authLoaded) {
      if (auth === null) {
        router.replace('/');
      } else {
        setChecked(true);
      }
    }
  }, [authLoaded, auth, router]);

  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark p-4 flex justify-center">
      {checked ? children : null}
    </div>
  );
}
