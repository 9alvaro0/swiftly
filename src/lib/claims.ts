// src/lib/claims.ts
import { getAdminAuth } from './firebase-admin';

/**
 * Sets Firebase Auth custom claims for a user based on their role.
 * This makes the role available in Storage Rules via request.auth.token.role
 * and request.auth.token.admin.
 */
export async function syncCustomClaims(uid: string, role: string): Promise<void> {
  const adminAuth = await getAdminAuth();
  if (!adminAuth) {
    console.warn('Admin Auth unavailable — cannot sync custom claims');
    return;
  }

  await adminAuth.setCustomUserClaims(uid, {
    role,
    admin: role === 'admin',
  });
}
