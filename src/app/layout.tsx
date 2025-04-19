import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import MainLayout from '@/components/layout/MainLayout';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mi Proyecto',
  description: 'Descripción de mi proyecto con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}