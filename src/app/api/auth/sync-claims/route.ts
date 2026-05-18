// src/app/api/auth/sync-claims/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { syncCustomClaims } from '@/lib/claims';

/**
 * POST /api/auth/sync-claims
 * Syncs Firebase custom claims for the authenticated user.
 * Called by AuthInitializer after login to ensure claims match Firestore role.
 */
export async function POST() {
  try {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const adminAuth = await getAdminAuth();
    const adminDb = await getAdminDb();

    if (!adminAuth || !adminDb) {
      return NextResponse.json({ error: 'Services unavailable' }, { status: 503 });
    }

    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get current role from Firestore
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const firestoreRole = userDoc.data()?.role || 'user';
    const claimRole = decodedToken.role;

    // Only sync if claims are missing or stale
    if (claimRole !== firestoreRole) {
      await syncCustomClaims(decodedToken.uid, firestoreRole);
      return NextResponse.json({ synced: true, role: firestoreRole });
    }

    return NextResponse.json({ synced: false, role: firestoreRole });
  } catch (error) {
    console.error('Error syncing claims:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
