import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SecureWipe — Certified Data Erasure Console',
  description: 'Wipe. Verify. Certify. Protect. Certified data erasure console for retired hardware.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
