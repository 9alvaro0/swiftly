// src/app/api/admin/users/route.ts
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { getAdminDb } from '@/lib/firebase-admin';
import { User } from '@/types/User';
import { serializeFirestoreData } from '@/services/firebase/utils/utils';

export async function GET(request: NextRequest) {
  try {
    // Get auth header
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid authorization header');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    if (!token || token.length < 100) {
      console.log('Invalid token format');
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    console.log(`Admin API: Fetching users with filters - search: "${searchTerm}", role: "${role}", status: "${status}"`);

    try {
      // Get Admin DB instance
      const adminDb = await getAdminDb();
      
      // Check if Firebase Admin is available
      if (!adminDb) {
        console.warn('Firebase Admin SDK not available, falling back to client SDK');
        
        // Import getAllUsers dynamically and call it
        const { getAllUsers } = await import('@/services/firebase/firestore/user');
        const users = await getAllUsers(searchTerm, role, status);
        console.log(`Admin API: Successfully fetched ${users.length} users via client SDK`);
        return Response.json({ users });
      }

      // Use Firebase Admin SDK to bypass security rules
      console.log('Using Firebase Admin SDK to fetch users');
      
      const query = adminDb.collection('users').orderBy('createdAt', 'desc');
      const snapshot = await query.get();
      
      console.log(`Admin API: Found ${snapshot.docs.length} user documents`);
      
      const users = snapshot.docs
        .map(doc => {
          try {
            const data = doc.data();
            // Convert Firestore timestamps to dates
            const userData = serializeFirestoreData(data) as User;
            return { ...userData, uid: doc.id };
          } catch (parseError) {
            console.error(`Error parsing user document ${doc.id}:`, parseError);
            return null;
          }
        })
        .filter((user): user is User => {
          if (!user) return false;
          
          // Apply filters
          const matchesRole = role ? user.role === role : true;
          const matchesStatus = status ? user.isActive === (status === 'active') : true;
          const matchesSearch = searchTerm
            ? (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.name?.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;

          return matchesRole && matchesStatus && matchesSearch;
        });

      console.log(`Admin API: Successfully fetched ${users.length} filtered users`);
      return Response.json({ users });
    } catch (dbError) {
      console.error('Database error in users query:', dbError);
      
      // Check if it's a permission error
      if (dbError instanceof Error && dbError.message.includes('permission-denied')) {
        return Response.json({ 
          error: 'Permission denied', 
          message: 'Insufficient permissions to access user data. Make sure you are logged in as an admin.' 
        }, { status: 403 });
      }
      
      // Other database errors
      return Response.json({ 
        error: 'Service temporarily unavailable', 
        message: 'Unable to connect to database. Please try again later.' 
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Error in /api/admin/users:', error);
    
    // Log full error details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return Response.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}