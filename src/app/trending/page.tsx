// src/app/trending/page.tsx
import { Metadata } from "next";
import { getAllPosts } from "@/firebase/firestore/post";
import PostGrid from "@/components/posts/PostGrid";

export const metadata: Metadata = {
  title: "Posts Populares | Swiftly",
  description: "Descubre los tutoriales y artículos más populares sobre Swift y SwiftUI",
  openGraph: {
    title: "Posts Populares | Swiftly",
    description: "Descubre los tutoriales y artículos más populares sobre Swift y SwiftUI",
    images: ["/og-trending.png"],
  },
};

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  // Obtener todos los posts
  const allPosts = await getAllPosts();
  
  // Ordenar por likes (descendente)
  const trendingPosts = allPosts
    .filter(post => post.isPublished && (post.likes || 0) > 0)
    .sort((a, b) => (b.likes || 0) - (a.likes || 0));

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-block px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-medium mb-4">
          Top por likes
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Posts Populares
        </h1>
        <p className="text-xl text-white/70 max-w-2xl">
          Los artículos y tutoriales más valorados por la comunidad Swift
        </p>
      </div>

      {trendingPosts.length > 0 ? (
        <PostGrid posts={trendingPosts} />
      ) : (
        <div className="text-center py-16 bg-gray-800/30 rounded-lg">
          <h2 className="text-2xl font-medium text-white mb-2">
            No hay posts populares todavía
          </h2>
          <p className="text-white/70">
            Sé el primero en dar like a los artículos que te gusten
          </p>
        </div>
      )}
      
      {/* Filtros adicionales podrían ir aquí */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Categorías Populares</h2>
        <div className="flex flex-wrap gap-2">
          {["Swift", "SwiftUI", "iOS", "Arquitectura", "Testing"].map(category => (
            <a 
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-white/80 transition-colors"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
