// src/lib/auth.ts
import { headers } from 'next/headers';
import { getAdminAuth, getAdminDb } from './firebase-admin';

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

interface VerifyResult {
  decodedToken: { uid: string; email?: string };
  uid: string;
  email: string;
  role: string;
}

/**
 * Verifies the Firebase ID token from the Authorization header and checks admin role.
 * Throws AuthError with appropriate status code on failure.
 */
export async function verifyAdminToken(): Promise<VerifyResult> {
  // 1. Extract Bearer token
  const headersList = await headers();
  const authHeader = headersList.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('Missing or invalid authorization header', 401);
  }

  const token = authHeader.substring(7);
  if (!token) {
    throw new AuthError('Missing token', 401);
  }

  // 2. Verify token cryptographically with Firebase Admin
  const adminAuth = await getAdminAuth();
  if (!adminAuth) {
    throw new AuthError('Auth service unavailable', 503);
  }

  let decodedToken;
  try {
    decodedToken = await adminAuth.verifyIdToken(token);
  } catch {
    throw new AuthError('Invalid or expired token', 401);
  }

  // 3. Check admin role in Firestore
  const adminDb = await getAdminDb();
  if (!adminDb) {
    throw new AuthError('Database service unavailable', 503);
  }

  const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
  if (!userDoc.exists) {
    throw new AuthError('User not found', 403);
  }

  const userData = userDoc.data();
  if (userData?.role !== 'admin') {
    throw new AuthError('Insufficient permissions', 403);
  }

  return {
    decodedToken: { uid: decodedToken.uid, email: decodedToken.email },
    uid: decodedToken.uid,
    email: decodedToken.email || '',
    role: userData.role,
  };
}
