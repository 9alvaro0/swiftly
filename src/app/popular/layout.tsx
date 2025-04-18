// src/app/popular/layout.tsx
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Posts Más Vistos | Swiftly",
  description: "Descubre los tutoriales y artículos más vistos sobre Swift y SwiftUI",
};

export default function PopularLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="w-full bg-black/30 border-b border-white/5 py-4 px-4 mb-8">
        <div className="container mx-auto flex items-center gap-3">
          <BookOpen className="text-blue-500" />
          <div>
            <h1 className="text-lg font-medium text-white">Posts Más Vistos</h1>
            <p className="text-sm text-gray-400">Descubre el contenido más leído por la comunidad</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
