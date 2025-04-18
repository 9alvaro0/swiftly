// src/app/trending/layout.tsx
import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Posts Populares | Swiftly",
  description: "Descubre los tutoriales y artículos más populares sobre Swift y SwiftUI",
};

export default function TrendingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="w-full bg-black/30 border-b border-white/5 py-4 px-4 mb-8">
        <div className="container mx-auto flex items-center gap-3">
          <TrendingUp className="text-red-500" />
          <div>
            <h1 className="text-lg font-medium text-white">Posts Populares</h1>
            <p className="text-sm text-gray-400">Descubre el contenido más valorado por la comunidad</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
