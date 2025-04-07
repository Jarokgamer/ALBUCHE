import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Albuche Hamburguesas',
  description: 'Las mejores hamburguesas artesanales de la ciudad',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-albuche-black text-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
} 