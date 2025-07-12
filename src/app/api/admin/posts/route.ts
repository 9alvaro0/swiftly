// src/app/api/admin/posts/route.ts
import { NextRequest } from 'next/server';
import { getAllPosts } from '@/services/firebase/firestore/post';
import { Post } from '@/types/Post';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';

    // Use the regular Firebase service instead of Admin SDK
    const allPosts = await getAllPosts();

    const posts: Post[] = allPosts
      .filter(post => {
        // Apply filters
        const matchesStatus = status ? 
          (status === 'published' ? post.isPublished : !post.isPublished) : true;
        const matchesType = type ? post.type === type : true;
        const matchesSearch = searchTerm ? 
          (post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) : true;

        return matchesStatus && matchesType && matchesSearch;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return Response.json({ posts });
  } catch (error) {
    console.error('Error getting posts:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}