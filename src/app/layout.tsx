import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import MainLayout from '@/components/layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swiftly - Tutoriales de Swift y SwiftUI',
  description: 'Blog, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}