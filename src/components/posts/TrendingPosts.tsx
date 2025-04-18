// src/components/posts/TrendingPosts.tsx
"use client";

import { useEffect, useState } from 'react';
import { Post } from '@/types/Post';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, TrendingUp } from 'lucide-react';
import { getAllPosts } from '@/firebase/firestore/post';

export default function TrendingPosts() {
  const [loading, setLoading] = useState(true);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchTrendingPosts() {
      try {
        setLoading(true);
        const posts = await getAllPosts();
        
        // Ordenar por likes (descendente) y filtrar solo posts con likes > 0
        const trending = posts
          .filter(post => (post.likes || 0) > 0)
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .slice(0, 5); // Tomar los 5 más populares
        
        setTrendingPosts(trending);
      } catch (error) {
        console.error('Error al cargar posts populares:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTrendingPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-gray-800/40 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-red-500" size={20} />
          <h2 className="text-xl font-bold text-white">Posts Populares</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700/50 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (trendingPosts.length === 0) {
    return null; // No mostrar nada si no hay posts populares
  }

  return (
    <div className="p-6 bg-gray-800/40 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-red-500" size={20} />
        <h2 className="text-xl font-bold text-white">Posts Populares</h2>
      </div>
      
      <div className="space-y-4">
        {trendingPosts.map(post => (
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
                <div className="flex items-center">
                  <Heart size={14} className="fill-red-500 text-red-500 mr-1" />
                  <span>{post.likes || 0}</span>
                </div>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Link 
          href="/trending"
          className="inline-block px-4 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
        >
          Ver todos los populares
        </Link>
      </div>
    </div>
  );
}
