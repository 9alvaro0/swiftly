// src/lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseCredentials } from './secret-manager';

let adminDb: ReturnType<typeof getFirestore> | null = null;
let adminAuth: ReturnType<typeof getAuth> | null = null;
let initializationPromise: Promise<void> | null = null;

// Initialize Firebase Admin SDK
async function initializeFirebaseAdmin() {
  if (getApps().length) {
    // If already initialized, get the existing instances
    adminDb = getFirestore();
    adminAuth = getAuth();
    console.log('Firebase Admin SDK already initialized, using existing instance');
    return;
  }

  try {
    console.log('Initializing Firebase Admin SDK...');
    
    // Get credentials from Secret Manager or environment variables
    const credentials = await getFirebaseCredentials();
    
    console.log('Firebase Admin SDK initialization check:');
    console.log('- Project ID:', credentials.projectId);
    console.log('- Client Email:', credentials.clientEmail ? 'Present' : 'Missing');
    console.log('- Private Key:', credentials.privateKey ? 'Present' : 'Missing');
    
    initializeApp({
      credential: cert({
        projectId: credentials.projectId,
        clientEmail: credentials.clientEmail,
        privateKey: credentials.privateKey,
      }),
      databaseURL: `https://${credentials.projectId}-default-rtdb.firebaseio.com`,
    });
    
    adminDb = getFirestore();
    adminAuth = getAuth();
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
    // Keep adminDb and adminAuth as null so the app knows admin features are disabled
  }
}

// Initialize on module load, but make it lazy for better performance
function ensureInitialized(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = initializeFirebaseAdmin();
  }
  return initializationPromise;
}

// Helper to get adminDb with initialization
export async function getAdminDb() {
  await ensureInitialized();
  return adminDb;
}

// Helper to get adminAuth with initialization
export async function getAdminAuth() {
  await ensureInitialized();
  return adminAuth;
}

// Export admin services (can be null if not initialized)
// These are for backward compatibility, but prefer using the helpers above
export { adminDb, adminAuth };