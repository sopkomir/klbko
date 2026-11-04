import './studio.css';
import type { ReactNode } from 'react';
export const metadata = { title: 'Klbko', description: 'Od témy k hotovej pomôcke za päť minút' };
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600;700&family=Lexend:wght@400;500;600&family=Caveat:wght@600;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
