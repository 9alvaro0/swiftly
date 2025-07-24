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

    console.log(`Admin API: Fetching posts with filters - search: "${searchTerm}", status: "${status}", type: "${type}"`);

    // Use client SDK since posts are now public access
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
      });

    console.log(`Admin API: Returning ${posts.length} filtered posts`);
    return Response.json({ posts });
  } catch (error) {
    console.error('Error getting posts:', error);
    return Response.json({ 
      error: 'Internal server error',
      message: 'Failed to fetch posts. Please try again later.'
    }, { status: 500 });
  }
}