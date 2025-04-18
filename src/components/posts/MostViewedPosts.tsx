"use client";

import { useEffect, useState } from 'react';
import { Post } from '@/types/Post';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Heart, TrendingUp } from 'lucide-react';
import { getAllPosts } from '@/firebase/firestore/post';

interface MostViewedPostsProps {
  limit?: number;
  className?: string;
}

export default function MostViewedPosts({ limit = 5, className = "" }: MostViewedPostsProps) {
  const [loading, setLoading] = useState(true);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPopularPosts() {
      try {
        setLoading(true);
        const posts = await getAllPosts();
        
        // Ordenar por vistas (descendente) y filtrar solo posts con vistas > 0
        const mostViewed = posts
          .filter(post => post.isPublished && (post.views || 0) > 0)
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, limit); // Tomar los más populares según el límite
        
        setPopularPosts(mostViewed);
      } catch (error) {
        console.error('Error al cargar posts más vistos:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPopularPosts();
  }, [limit]);

  if (loading) {
    return (
      <div className={`p-6 bg-gray-800/40 rounded-lg ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-white">Más Vistos</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700/50 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (popularPosts.length === 0) {
    return null; // No mostrar nada si no hay posts populares
  }

  return (
    <div className={`p-6 bg-gray-800/40 rounded-lg ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold text-white">Más Vistos</h2>
      </div>
      
      <div className="space-y-4">
        {popularPosts.map(post => (
          <Link 
            href={`/posts/${post.slug}`}
            key={post.id}
            className="flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-gray-700/30"
          >
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={60}
                height={60}
                className="rounded-md object-cover w-[60px] h-[60px]"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white truncate">{post.title}</h3>
              <p className="text-sm text-gray-300 line-clamp-1">{post.description}</p>
              
              <div className="flex items-center mt-1 text-xs text-gray-400">
                {/* Contador de vistas */}
                <div className="flex items-center">
                  <BookOpen size={14} className="text-blue-400 mr-1" />
                  <span>{post.views || 0}</span>
                </div>
                
                {/* Mostramos likes si existen */}
                {post.likedBy && post.likedBy.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Heart size={14} className="fill-red-500 text-red-500 mr-1" />
                      <span>{post.likedBy.length}</span>
                    </div>
                  </>
                )}
                
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Link 
          href="/popular"
          className="inline-block px-4 py-2 text-sm bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md transition-colors"
        >
          Ver todos los más vistos
        </Link>
      </div>
    </div>
  );
}
