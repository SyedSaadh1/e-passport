import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';

export const metadata = {
  title: 'E-Passport | register and receive a unique ePassport User ID',
  description:
    'A complete, user-friendly ePassport registration and verification system'
};


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Analytics />
        <footer className="flex justify-center items-center border-t p-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ePassport. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
