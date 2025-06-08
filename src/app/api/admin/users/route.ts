// src/app/api/admin/users/route.ts
import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAdminToken, createAuthResponse } from '@/lib/auth-helpers';
import { User } from '@/types/User';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  const adminUser = await verifyAdminToken(request);
  if (!adminUser) {
    return createAuthResponse('Unauthorized: Admin access required');
  }

  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    // Get all users from Firestore
    const usersSnapshot = await adminDb
      .collection('users')
      .orderBy('createdAt', 'desc')
      .get();

    const users: User[] = usersSnapshot.docs
      .map(doc => {
        const data = doc.data();
        // Convert Firestore timestamps to dates
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate() || new Date(),
        } as User;
      })
      .filter(user => {
        // Apply filters
        const matchesRole = role ? user.role === role : true;
        const matchesStatus = status ? user.isActive === (status === 'active') : true;
        const matchesSearch = searchTerm ? 
          (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.name?.toLowerCase().includes(searchTerm.toLowerCase())) : true;

        return matchesRole && matchesStatus && matchesSearch;
      });

    return Response.json({ users });
  } catch (error) {
    console.error('Error getting users:', error);
    return createAuthResponse('Internal server error', 500);
  }
}