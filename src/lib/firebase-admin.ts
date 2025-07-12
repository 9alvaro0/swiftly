// src/lib/firebase-admin.ts
import * as admin from 'firebase-admin';

let adminDb: admin.firestore.Firestore | null = null;
let adminAuth: admin.auth.Auth | null = null;

// Initialize Firebase Admin SDK only if credentials are available
try {
  if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const projectId = process.env.FIREBASE_PROJECT_ID || 'swiftly-by-warwere';
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    
    // Only initialize if we have the required credentials
    if (privateKey && clientEmail) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
      });
      
      adminDb = admin.firestore();
      adminAuth = admin.auth();
      console.log('Firebase Admin SDK initialized successfully');
    } else {
      console.warn('Firebase Admin SDK credentials not found, admin features will be disabled');
    }
  }
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
}

// Export admin services with null checks for App Hosting compatibility
export { adminDb, adminAuth };