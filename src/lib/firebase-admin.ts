// src/lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let adminDb: ReturnType<typeof getFirestore> | null = null;
let adminAuth: ReturnType<typeof getAuth> | null = null;

// Initialize Firebase Admin SDK only if credentials are available
try {
  if (!getApps().length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const projectId = process.env.FIREBASE_PROJECT_ID || 'swiftly-by-warwere';
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    
    console.log('Firebase Admin SDK initialization check:');
    console.log('- Project ID:', projectId);
    console.log('- Client Email:', clientEmail ? 'Present' : 'Missing');
    console.log('- Private Key:', privateKey ? 'Present' : 'Missing');
    
    // Only initialize if we have the required credentials
    if (privateKey && clientEmail) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
      });
      
      adminDb = getFirestore();
      adminAuth = getAuth();
      console.log('Firebase Admin SDK initialized successfully');
    } else {
      console.warn('Firebase Admin SDK credentials not found, admin features will be disabled');
      console.warn('Missing:', {
        privateKey: !privateKey,
        clientEmail: !clientEmail,
      });
    }
  } else {
    // If already initialized, get the existing instances
    adminDb = getFirestore();
    adminAuth = getAuth();
    console.log('Firebase Admin SDK already initialized, using existing instance');
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
}

// Export admin services (can be null if not initialized)
export { adminDb, adminAuth };