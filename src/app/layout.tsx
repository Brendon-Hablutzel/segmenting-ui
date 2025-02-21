import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
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

export const metadata: Metadata = {
  title: 'Seg UI',
  description: 'A platform for generalized image segmentation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlexSans.variable} ${IBMPlexMono.variable} antialiased font-[family-name:var(--font-ibm-sans)]`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
