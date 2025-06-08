// src/app/api/admin/newsletter/route.ts
import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAdminToken, createAuthResponse } from '@/lib/auth-helpers';
import NewsletterSubscriber from '@/types/NewsletterSubscriber';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  const adminUser = await verifyAdminToken(request);
  if (!adminUser) {
    return createAuthResponse('Unauthorized: Admin access required');
  }

  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    // Get all newsletter subscribers from Firestore
    const subscribersSnapshot = await adminDb
      .collection('newsletterSubscribers')
      .orderBy('createdAt', 'desc')
      .get();

    const subscribers: NewsletterSubscriber[] = subscribersSnapshot.docs
      .map(doc => {
        const data = doc.data();
        // Convert Firestore timestamps to dates
        return {
          id: doc.id,
          email: data.email || '',
          isActive: data.isActive || false,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastEmailSent: data.lastEmailSent?.toDate(),
          metadata: data.metadata,
        } as NewsletterSubscriber;
      })
      .filter(subscriber => {
        // Apply filters
        const matchesStatus = status ? subscriber.isActive === (status === 'active') : true;
        const matchesSearch = searchTerm ? 
          subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase()) : true;

        return matchesStatus && matchesSearch;
      });

    return Response.json({ subscribers });
  } catch (error) {
    console.error('Error getting newsletter subscribers:', error);
    return createAuthResponse('Internal server error', 500);
  }
}