// src/app/api/admin/newsletter/route.ts
import { NextRequest } from 'next/server';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import NewsletterSubscriber from '@/types/NewsletterSubscriber';
import { convertTimestampsToDates } from '@/services/firebase/utils/utils';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get auth header
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid authorization header');
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Basic token validation
    const token = authHeader.substring(7);
    if (!token || token.length < 100) {
      console.log('Invalid token format');
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    console.log(`Admin API: Fetching newsletter subscribers with filters - search: "${searchTerm}", status: "${status}"`);

    try {
      // Get all newsletter subscribers from Firestore
      const subscribersRef = collection(db, 'newsletterSubscribers');
      const q = query(subscribersRef, orderBy('createdAt', 'desc'));
      const subscribersSnapshot = await getDocs(q);

      console.log(`Admin API: Found ${subscribersSnapshot.docs.length} newsletter documents`);

      const subscribers: NewsletterSubscriber[] = subscribersSnapshot.docs
        .map(doc => {
          try {
            const data = convertTimestampsToDates(doc.data()) as Record<string, unknown>;
            return {
              id: doc.id,
              email: data.email || '',
              isActive: data.isActive !== false, // Default to true if not specified
              createdAt: data.createdAt || new Date(),
              lastEmailSent: data.lastEmailSent,
              metadata: data.metadata,
            } as NewsletterSubscriber;
          } catch (parseError) {
            console.error(`Error parsing document ${doc.id}:`, parseError);
            return null;
          }
        })
        .filter((subscriber): subscriber is NewsletterSubscriber => {
          if (!subscriber) return false;
          
          // Apply filters
          const matchesStatus = status ? subscriber.isActive === (status === 'active') : true;
          const matchesSearch = searchTerm ? 
            subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase()) : true;

          return matchesStatus && matchesSearch;
        });

      console.log(`Admin API: Returning ${subscribers.length} filtered subscribers`);
      return Response.json({ subscribers });
    } catch (dbError) {
      console.error('Database error in newsletter query:', dbError);
      // If Firebase is having issues, return 503
      return Response.json({ 
        error: 'Service temporarily unavailable', 
        message: 'Unable to connect to database. Please try again later.' 
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Error in /api/admin/newsletter:', error);
    
    // Log full error details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return Response.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    }, { status: 500 });
  }
}