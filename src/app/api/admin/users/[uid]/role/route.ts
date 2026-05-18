// src/app/api/admin/users/[uid]/role/route.ts
import { NextRequest } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { verifyAdminToken, AuthError } from '@/lib/auth';
import { syncCustomClaims } from '@/lib/claims';

const VALID_ROLES = ['admin', 'editor', 'author', 'user', 'guest'] as const;
type ValidRole = typeof VALID_ROLES[number];

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    // Verify the caller is an admin
    await verifyAdminToken();

    const { uid } = await params;
    if (!uid || typeof uid !== 'string') {
      return Response.json({ error: 'Valid user UID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { role } = body;

    if (!role || !VALID_ROLES.includes(role as ValidRole)) {
      return Response.json(
        { error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` },
        { status: 400 }
      );
    }

    const adminDb = await getAdminDb();
    const adminAuth = await getAdminAuth();

    if (!adminDb || !adminAuth) {
      return Response.json({ error: 'Admin services unavailable' }, { status: 503 });
    }

    // Verify the target user exists
    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Update role in Firestore
    await userRef.update({
      role,
      updatedAt: new Date(),
    });

    // Sync custom claims in Firebase Auth
    await syncCustomClaims(uid, role);

    return Response.json({
      success: true,
      message: `Role updated to "${role}" for user ${uid}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return Response.json({ error: error.message }, { status: error.statusCode });
    }
    console.error('Error updating user role:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
