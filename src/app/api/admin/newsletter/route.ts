// src/app/api/admin/newsletter/route.ts
import { NextRequest } from 'next/server';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import NewsletterSubscriber from '@/types/NewsletterSubscriber';
import { convertTimestampsToDates } from '@/services/firebase/utils/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    // Get all newsletter subscribers from Firestore using regular Firebase SDK
    const subscribersRef = collection(db, 'newsletterSubscribers');
    const q = query(subscribersRef, orderBy('createdAt', 'desc'));
    const subscribersSnapshot = await getDocs(q);

    const subscribers: NewsletterSubscriber[] = subscribersSnapshot.docs
      .map(doc => {
        const data = convertTimestampsToDates(doc.data()) as any;
        return {
          id: doc.id,
          email: data.email || '',
          isActive: data.isActive || false,
          createdAt: data.createdAt || new Date(),
          lastEmailSent: data.lastEmailSent,
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
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}