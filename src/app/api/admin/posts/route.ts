// src/app/api/admin/posts/route.ts
import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAdminToken, createAuthResponse } from '@/lib/auth-helpers';
import { Post } from '@/types/Post';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  const adminUser = await verifyAdminToken(request);
  if (!adminUser) {
    return createAuthResponse('Unauthorized: Admin access required');
  }

  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';

    // Get all posts from Firestore
    const postsSnapshot = await adminDb
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get();

    const posts: Post[] = postsSnapshot.docs
      .map(doc => {
        const data = doc.data();
        // Convert Firestore timestamps to dates
        return {
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate() || null,
        } as Post;
      })
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

    return Response.json({ posts });
  } catch (error) {
    console.error('Error getting posts:', error);
    return createAuthResponse('Internal server error', 500);
  }
}