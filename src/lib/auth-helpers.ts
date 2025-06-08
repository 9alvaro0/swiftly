// src/lib/auth-helpers.ts
import { adminAuth } from './firebase-admin';
import { NextRequest } from 'next/server';

export interface AdminUser {
  uid: string;
  email: string;
  isAdmin: boolean;
}

export async function verifyAdminToken(request: NextRequest): Promise<AdminUser | null> {
  try {
    if (!adminAuth) {
      console.error('Firebase Admin Auth not initialized');
      return null;
    }

    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Check if user is admin based on email or custom claims
    const isAdmin = 
      decodedToken.admin === true ||
      decodedToken.role === 'admin' ||
      decodedToken.email === '9alvaro0@gmail.com';

    if (!isAdmin) {
      return null;
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      isAdmin: true,
    };
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

export function createAuthResponse(error: string, status: number = 401) {
  return Response.json({ error }, { status });
}