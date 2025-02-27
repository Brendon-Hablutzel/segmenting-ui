'use client';

import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthContextProvider } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import './globals.css';

const IBMPlexSans = IBM_Plex_Sans({
  weight: '400',
  variable: '--font-ibm-sans',
  subsets: ['latin'],
});

const IBMPlexMono = IBM_Plex_Mono({
  weight: '400',
  variable: '--font-ibm-mono',
  subsets: ['latin'],
});

// TODO: responsive design everywhere

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/login': 'Login | Seg UI',
      '/jobs': 'Jobs | Seg UI',
      '/add-job': 'Add Job | Seg UI',
      '/signup': 'Sign Up | Seg UI',
    };
    document.title = titles[pathname] || 'Seg UI';
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${IBMPlexSans.variable} ${IBMPlexMono.variable} antialiased font-[family-name:var(--font-ibm-sans)] bg-bg-dark`}
      >
        <AuthContextProvider>{children}</AuthContextProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
